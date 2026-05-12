import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventariosService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    const inventario = this.inventarioRepository.create({
      ...createInventarioDto,
      cantidadOriginal: createInventarioDto.cantidad,
    });
    return this.inventarioRepository.save(inventario);
  }

  async findAll(): Promise<Inventario[]> {
    return this.inventarioRepository.find({
      relations: ['producto', 'producto.categoria'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id },
      relations: ['producto', 'producto.categoria'],
    });
    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventario;
  }

  async findByProducto(productoId: number): Promise<Inventario[]> {
    return this.inventarioRepository.find({
      where: { productoId },
      relations: ['producto'],
      order: { fechaVencimiento: 'ASC' },
    });
  }

  async findVencidos(): Promise<Inventario[]> {
    return this.inventarioRepository.find({
      where: {
        estado: 'disponible',
        fechaVencimiento: LessThan(new Date()),
      },
      relations: ['producto'],
      order: { fechaVencimiento: 'ASC' },
    });
  }

  async findPorVencer(dias: number = 30): Promise<Inventario[]> {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + dias);

    return this.inventarioRepository.find({
      where: {
        estado: 'disponible',
        fechaVencimiento: MoreThan(new Date()),
      },
      relations: ['producto'],
      order: { fechaVencimiento: 'ASC' },
    });
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario> {
    const inventario = await this.findOne(id);
    Object.assign(inventario, updateInventarioDto);
    return this.inventarioRepository.save(inventario);
  }

  async remove(id: number): Promise<void> {
    const inventario = await this.findOne(id);
    await this.inventarioRepository.remove(inventario);
  }

  async actualizarCantidad(id: number, cantidad: number): Promise<Inventario> {
    const inventario = await this.findOne(id);
    inventario.cantidad = cantidad;
    return this.inventarioRepository.save(inventario);
  }

  async getStockTotal(): Promise<any> {
    const inventarios = await this.inventarioRepository
      .createQueryBuilder('inv')
      .leftJoinAndSelect('inv.producto', 'producto')
      .where('inv.estado = :estado', { estado: 'disponible' })
      .getMany();

    return inventarios.reduce((acc, inv) => {
      const nombre = inv.producto?.nombre || 'Desconocido';
      acc[nombre] = (acc[nombre] || 0) + inv.cantidad;
      return acc;
    }, {});
  }
}