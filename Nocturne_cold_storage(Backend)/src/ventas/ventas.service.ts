import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta, MetodoPago, EstadoVenta, TipoEntrega } from './entities/venta.entity';
import { DetalleVenta } from '../detalles-venta/entities/detalle-venta.entity';
import { CreateVentaDto, UpdateVentaDto } from './dto/create-venta.dto';
import { MovimientosInventarioService } from '../movimientos-inventario/movimientos-inventario.service';
import { TipoMovimiento } from '../movimientos-inventario/entities/movimiento-inventario.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private readonly detalleRepository: Repository<DetalleVenta>,
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
    private readonly movimientosService: MovimientosInventarioService,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const { detalles, ...ventaData } = createVentaDto;

    // Calcular totales
    const subtotal = detalles.reduce(
      (sum, d) => sum + d.cantidad * d.precioUnitario - (d.descuento || 0),
      0,
    );
    const impuesto = subtotal * 0.13; // 13% IVA
    const total = subtotal + impuesto - (ventaData.descuento || 0);

    // Crear venta
    const venta = this.ventaRepository.create({
      ...ventaData,
      tipoEntrega: ventaData.tipoEntrega || TipoEntrega.RECOJO,
      subtotal,
      impuesto,
      total,
      estado: EstadoVenta.PENDIENTE,
    });
    const savedVenta = await this.ventaRepository.save(venta);

    // Crear detalles y actualizar inventario
    for (const detalleDto of detalles) {
      const detalle = this.detalleRepository.create({
        ...detalleDto,
        ventaId: savedVenta.id,
        subtotal: detalleDto.cantidad * detalleDto.precioUnitario - (detalleDto.descuento || 0),
      });
      await this.detalleRepository.save(detalle);

      // Registrar movimiento de inventario (salida por venta)
      if (detalleDto.inventarioId) {
        await this.movimientosService.create({
          tipo: TipoMovimiento.SALIDA,
          cantidad: detalleDto.cantidad,
          inventarioId: detalleDto.inventarioId,
          origenTipo: 'venta',
          origenId: savedVenta.id,
          ventaId: savedVenta.id,
          usuarioId: ventaData.usuarioId || 1,
          motivo: 'Venta',
        });
      }
    }

    return this.findOne(savedVenta.id);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({
      relations: ['cliente', 'usuario', 'detalles', 'detalles.producto'],
      order: { fechaVenta: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['cliente', 'usuario', 'detalles', 'detalles.producto', 'detalles.inventario'],
    });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }

  async findByDateRange(inicio: Date, fin: Date): Promise<Venta[]> {
    return this.ventaRepository
      .createQueryBuilder('venta')
      .leftJoinAndSelect('venta.cliente', 'cliente')
      .leftJoinAndSelect('venta.usuario', 'usuario')
      .leftJoinAndSelect('venta.detalles', 'detalles')
      .where('venta.fechaVenta BETWEEN :inicio AND :fin', { inicio, fin })
      .orderBy('venta.fechaVenta', 'DESC')
      .getMany();
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    Object.assign(venta, updateVentaDto);
    return this.ventaRepository.save(venta);
  }

  async cancel(id: number): Promise<Venta> {
    const venta = await this.findOne(id);
    venta.estado = EstadoVenta.CANCELADA;
    return this.ventaRepository.save(venta);
  }

  async remove(id: number): Promise<void> {
    const venta = await this.findOne(id);
    await this.ventaRepository.remove(venta);
  }

  async getEstadisticas(inicio: Date, fin: Date): Promise<any> {
    const ventas = await this.findByDateRange(inicio, fin);
    
    const porMetodo = ventas.reduce((acc, v) => {
      acc[v.metodoPago] = (acc[v.metodoPago] || 0) + 1;
      return acc;
    }, {});

    const totalVentas = ventas.length;
    const montoTotal = ventas.reduce((sum, v) => sum + Number(v.total), 0);

    return {
      totalVentas,
      montoTotal,
      promedioVenta: totalVentas > 0 ? montoTotal / totalVentas : 0,
      porMetodo,
      ventas,
    };
  }
}