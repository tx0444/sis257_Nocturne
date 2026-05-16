import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoInventario, TipoMovimiento } from './entities/movimiento-inventario.entity';
import { CreateMovimientoInventarioDto } from './dto/create-movimiento-inventario.dto';
import { UpdateMovimientoInventarioDto } from './dto/update-movimiento-inventario.dto';
import { Inventario } from '../inventarios/entities/inventario.entity';

@Injectable()
export class MovimientosInventarioService {
  constructor(
    @InjectRepository(MovimientoInventario)
    private readonly movimientoRepository: Repository<MovimientoInventario>,
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoInventarioDto): Promise<MovimientoInventario> {
    const { cantidad, tipo, inventarioId } = createMovimientoDto;

    // Obtener el inventario actual
    const inventario = await this.inventarioRepository.findOne({
      where: { id: inventarioId },
    });

    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${inventarioId} no encontrado`);
    }

    // Calcular nuevas cantidades según tipo de movimiento
    let cantidadAntes = inventario.cantidad;
    let cantidadDespues: number;

    switch (tipo) {
      case TipoMovimiento.ENTRADA:
        cantidadDespues = cantidadAntes + cantidad;
        break;
      case TipoMovimiento.SALIDA:
      case TipoMovimiento.MERMA:
        cantidadDespues = cantidadAntes - cantidad;
        if (cantidadDespues < 0) {
          throw new Error('Stock insuficiente para el movimiento');
        }
        break;
      case TipoMovimiento.AJUSTE:
        cantidadDespues = cantidad;
        cantidadAntes = inventario.cantidadOriginal || cantidadAntes;
        break;
      default:
        cantidadDespues = cantidadAntes;
    }

    // Crear el movimiento
    const movimiento = this.movimientoRepository.create({
      ...createMovimientoDto,
      cantidadAntes,
      cantidadDespues,
    });

    // Actualizar el inventario
    inventario.cantidad = cantidadDespues;
    await this.inventarioRepository.save(inventario);

    return this.movimientoRepository.save(movimiento);
  }

  async findAll(): Promise<MovimientoInventario[]> {
    return this.movimientoRepository.find({
      relations: ['inventario', 'inventario.producto', 'venta', 'usuario'],
      order: { fechaMovimiento: 'DESC' },
    });
  }

  async findOne(id: number): Promise<MovimientoInventario> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id },
      relations: ['inventario', 'inventario.producto', 'venta', 'usuario'],
    });
    if (!movimiento) {
      throw new NotFoundException(`Movimiento con ID ${id} no encontrado`);
    }
    return movimiento;
  }

  async findByInventario(inventarioId: number): Promise<MovimientoInventario[]> {
    return this.movimientoRepository.find({
      where: { inventarioId },
      relations: ['usuario'],
      order: { fechaMovimiento: 'DESC' },
    });
  }

  async findByTipo(tipo: TipoMovimiento): Promise<MovimientoInventario[]> {
    return this.movimientoRepository.find({
      where: { tipo },
      relations: ['inventario', 'inventario.producto', 'usuario'],
      order: { fechaMovimiento: 'DESC' },
    });
  }

  async findByDateRange(inicio: Date, fin: Date): Promise<MovimientoInventario[]> {
    return this.movimientoRepository
      .createQueryBuilder('movimiento')
      .leftJoinAndSelect('movimiento.inventario', 'inventario')
      .leftJoinAndSelect('inventario.producto', 'producto')
      .leftJoinAndSelect('movimiento.usuario', 'usuario')
      .where('movimiento.fechaMovimiento BETWEEN :inicio AND :fin', { inicio, fin })
      .orderBy('movimiento.fechaMovimiento', 'DESC')
      .getMany();
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoInventarioDto): Promise<MovimientoInventario> {
    const movimiento = await this.findOne(id);
    Object.assign(movimiento, updateMovimientoDto);
    return this.movimientoRepository.save(movimiento);
  }

  async remove(id: number): Promise<void> {
    const movimiento = await this.findOne(id);
    await this.movimientoRepository.remove(movimiento);
  }

  async getKardex(productoId?: number): Promise<any[]> {
    const query = this.movimientoRepository
      .createQueryBuilder('movimiento')
      .leftJoinAndSelect('movimiento.inventario', 'inventario')
      .leftJoinAndSelect('inventario.producto', 'producto')
      .leftJoinAndSelect('movimiento.usuario', 'usuario');

    if (productoId) {
      query.where('inventario.productoId = :productoId', { productoId });
    }

    return query
      .orderBy('movimiento.fechaMovimiento', 'ASC')
      .getMany();
  }
}