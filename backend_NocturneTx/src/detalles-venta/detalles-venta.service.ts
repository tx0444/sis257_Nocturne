import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';

@Injectable()
export class DetallesVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private readonly detalleRepository: Repository<DetalleVenta>,
  ) {}

  async create(createDetallesVentaDto: CreateDetallesVentaDto): Promise<DetalleVenta> {
    const detalle = this.detalleRepository.create(createDetallesVentaDto);
    return this.detalleRepository.save(detalle);
  }

  async findAll(): Promise<DetalleVenta[]> {
    return this.detalleRepository.find({
      relations: ['venta', 'producto', 'inventario'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<DetalleVenta> {
    const detalle = await this.detalleRepository.findOne({
      where: { id },
      relations: ['venta', 'producto', 'inventario'],
    });
    if (!detalle) {
      throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    }
    return detalle;
  }

  async findByVenta(ventaId: number): Promise<DetalleVenta[]> {
    return this.detalleRepository.find({
      where: { ventaId },
      relations: ['producto', 'inventario'],
    });
  }

  async update(id: number, updateDetallesVentaDto: UpdateDetallesVentaDto): Promise<DetalleVenta> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, updateDetallesVentaDto);
    return this.detalleRepository.save(detalle);
  }

  async remove(id: number): Promise<void> {
    const detalle = await this.findOne(id);
    await this.detalleRepository.remove(detalle);
  }

  async getProductosMasVendidos(limit: number = 10): Promise<any[]> {
    const result = await this.detalleRepository
      .createQueryBuilder('detalle')
      .select('detalle.productoId', 'productoId')
      .addSelect('SUM(detalle.cantidad)', 'totalVendido')
      .groupBy('detalle.productoId')
      .orderBy('totalVendido', 'DESC')
      .limit(limit)
      .getRawMany();

    return result;
  }
}