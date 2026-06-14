import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { DetalleCompra } from '../detalles-compra/entities/detalle-compra.entity';
import { Producto } from '../productos/entities/producto.entity';
import { CreateCompraDto } from './dto/create-compra.dto';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly compraRepository: Repository<Compra>,
    @InjectRepository(DetalleCompra)
    private readonly detalleCompraRepository: Repository<DetalleCompra>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { detalles, ...compraData } = createCompraDto;

      // Calcular total
      let total = 0;
      for (const det of detalles) {
        total += det.cantidad * det.precio;
      }

      // Crear compra
      const compra = queryRunner.manager.create(Compra, {
        ...compraData,
        total,
        fecha: new Date(),
      });
      const savedCompra = await queryRunner.manager.save(compra);

      // Crear detalles y actualizar stock
      for (const det of detalles) {
        const subtotal = det.cantidad * det.precio;
        const detalle = queryRunner.manager.create(DetalleCompra, {
          compraId: savedCompra.id,
          productoId: det.productoId,
          cantidad: det.cantidad,
          precio: det.precio,
          subtotal,
        });
        await queryRunner.manager.save(detalle);

        // Actualizar stock del producto (incrementar)
        const producto = await queryRunner.manager.findOne(Producto, {
          where: { id: det.productoId },
        });
        if (!producto) {
          throw new NotFoundException(`Producto con ID ${det.productoId} no encontrado`);
        }
        producto.stock = Number(producto.stock) + det.cantidad;
        producto.precioCompra = det.precio;
        await queryRunner.manager.save(producto);
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedCompra.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: ['proveedor', 'usuario', 'detalles', 'detalles.producto'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id },
      relations: ['proveedor', 'usuario', 'detalles', 'detalles.producto'],
    });
    if (!compra) {
      throw new NotFoundException(`Compra con ID ${id} no encontrada`);
    }
    return compra;
  }

  async remove(id: number): Promise<void> {
    const compra = await this.findOne(id);
    await this.compraRepository.softRemove(compra);
  }
}
