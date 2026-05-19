import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { DetallesVenta } from 'src/detalles-ventas/entities/detalles-venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { EstadoVenta, Venta } from './entities/venta.entity';

const hasDatabaseCode = (error: unknown): error is { code: string } =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as { code: unknown }).code === 'string';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
    private dataSource: DataSource,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    return this.dataSource.transaction(async (manager) => {
      const fechaReferencia = createVentaDto.fechaVenta ?? new Date();

      let empleado: Empleado | null = null;
      if (createVentaDto.empleadoId) {
        empleado = await manager.findOne(Empleado, {
          where: { id: createVentaDto.empleadoId },
        });
        if (!empleado) {
          throw new NotFoundException(`Empleado ${createVentaDto.empleadoId} no existe`);
        }
      }

      let cliente: Cliente | null = null;
      if (createVentaDto.clienteId) {
        cliente = await manager.findOne(Cliente, {
          where: { id: createVentaDto.clienteId },
        });
        if (!cliente) {
          throw new NotFoundException(`Cliente ${createVentaDto.clienteId} no existe`);
        }
      }

      let totalCalculado = createVentaDto.total ?? 0;
      const detallesAGuardar: Partial<DetallesVenta>[] = [];

      // Si vienen items, calculamos el total y verificamos stock
      if (createVentaDto.items && createVentaDto.items.length > 0) {
        totalCalculado = 0;
        for (const item of createVentaDto.items) {
          const producto = await manager.findOne(Producto, { where: { id: item.productoId } });
          if (!producto) {
            throw new NotFoundException(`Producto ${item.productoId} no encontrado`);
          }
          if (producto.stock < item.cantidad) {
            throw new BadRequestException(`Stock insuficiente para ${producto.nombre}`);
          }
          // Descontar stock
          producto.stock -= item.cantidad;
          await manager.save(Producto, producto);

          const subtotal = Number((producto.precio * item.cantidad).toFixed(2));
          totalCalculado += subtotal;

          detallesAGuardar.push({
            productoId: producto.id,
            cantidad: item.cantidad,
            precioUnitario: producto.precio,
            subtotal,
          });
        }
      }

      let notasFinales = createVentaDto.notas ?? null;

      // Validar montoRecibido si es efectivo
      if (createVentaDto.metodoPago === 'efectivo' && createVentaDto.montoRecibido !== undefined) {
        if (createVentaDto.montoRecibido < totalCalculado) {
          throw new BadRequestException(`El monto recibido (Bs. ${createVentaDto.montoRecibido}) es menor al total (Bs. ${totalCalculado})`);
        }
        const cambio = createVentaDto.montoRecibido - totalCalculado;
        notasFinales = notasFinales 
          ? `${notasFinales} | Monto Recibido: Bs. ${createVentaDto.montoRecibido} | Cambio: Bs. ${cambio.toFixed(2)}`
          : `Monto Recibido: Bs. ${createVentaDto.montoRecibido} | Cambio: Bs. ${cambio.toFixed(2)}`;
      }

      const venta = manager.create(Venta, {
        empleadoId: createVentaDto.empleadoId ?? null,
        clienteId: createVentaDto.clienteId ?? null,
        fechaHora: new Date(),
        fechaVenta: fechaReferencia,
        total: totalCalculado,
        metodoPago: createVentaDto.metodoPago,
        clienteNombre: cliente ? cliente.nombre : (createVentaDto.clienteNombre ?? null),
        notas: notasFinales,
        estado: EstadoVenta.COMPLETADA,
        empleadoNombreSnapshot: empleado?.nombre ?? 'Sistema Web',
      });

      const ventaGuardada = await manager.save(Venta, venta);

      // Guardar detalles
      for (const det of detallesAGuardar) {
        const detalle = manager.create(DetallesVenta, {
          ...det,
          ventaId: ventaGuardada.id,
        });
        await manager.save(DetallesVenta, detalle);
      }

      return manager.findOne(Venta, {
        where: { id: ventaGuardada.id },
        relations: ['detallesVentas', 'empleado', 'cliente'],
      }) as Promise<Venta>;
    });
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: ['empleado', 'cliente'],
      order: { fechaHora: 'DESC' },
    });
  }

  async findByCliente(clienteId: number): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { clienteId },
      relations: ['detallesVentas', 'detallesVentas.producto'],
      order: { fechaHora: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['detallesVentas', 'empleado', 'cliente'],
    });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const partial: Partial<Venta> = { id };
    
    // Simplificado para no hacer el archivo tan largo y ya que `update` de ventas
    // generalmente no debería cambiar los items o stocks en este sistema básico.
    if (updateVentaDto.total !== undefined) partial.total = updateVentaDto.total;
    if (updateVentaDto.metodoPago !== undefined) partial.metodoPago = updateVentaDto.metodoPago;
    if (updateVentaDto.clienteNombre !== undefined) partial.clienteNombre = updateVentaDto.clienteNombre;
    if (updateVentaDto.notas !== undefined) partial.notas = updateVentaDto.notas;

    const preloaded = await this.ventasRepository.preload(partial);
    if (!preloaded) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    return this.ventasRepository.save(preloaded);
  }

  async remove(id: number): Promise<void> {
    const venta = await this.findOne(id);
    await this.ventasRepository.softRemove(venta);
  }
}
