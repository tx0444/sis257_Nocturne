import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ComboProducto } from './entities/combo-producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(ComboProducto)
    private readonly comboProductoRepository: Repository<ComboProducto>,
  ) {}

  private synchronizePrices(producto: any) {
    const unidades = Number(producto.unidadesPorCaja || 6);

    // 1. Sync from old fields if new fields are not set or are zero
    if (producto.precioCompra !== undefined && (!producto.precioCompraUnidad || Number(producto.precioCompraUnidad) === 0)) {
      producto.precioCompraUnidad = Number(producto.precioCompra);
    }
    if (producto.precioVenta !== undefined && (!producto.precioVentaUnidad || Number(producto.precioVentaUnidad) === 0)) {
      producto.precioVentaUnidad = Number(producto.precioVenta);
    }

    // 2. Sync to old fields if new fields are modified
    if (producto.precioCompraUnidad !== undefined) {
      producto.precioCompra = Number(producto.precioCompraUnidad);
    }
    if (producto.precioVentaUnidad !== undefined) {
      producto.precioVenta = Number(producto.precioVentaUnidad);
    }

    // 3. Compute box prices if zero or empty
    if (!producto.precioCompraCaja || Number(producto.precioCompraCaja) === 0) {
      producto.precioCompraCaja = Number(producto.precioCompraUnidad || 0) * unidades;
    }
    if (!producto.precioVentaCaja || Number(producto.precioVentaCaja) === 0) {
      producto.precioVentaCaja = Number(producto.precioVentaUnidad || 0) * unidades;
    }

    // Also keep precioCaja synchronized for backward compatibility
    producto.precioCaja = Number(producto.precioVentaCaja);
  }

  async create(createProductoDto: CreateProductoDto & { items?: { productoId: number; cantidad: number }[] }): Promise<Producto> {
    const { items, ...prodData } = createProductoDto;
    const producto = this.productoRepository.create({
      vendePorUnidad: true,
      vendePorCaja: true,
      unidadesPorCaja: 6,
      ...prodData,
    });
    this.synchronizePrices(producto);
    const saved = await this.productoRepository.save(producto);

    if (saved.esCombo && items && items.length > 0) {
      for (const item of items) {
        const comboItem = this.comboProductoRepository.create({
          comboId: saved.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
        });
        await this.comboProductoRepository.save(comboItem);
      }
    }
    return saved;
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['categoria', 'marca', 'proveedor', 'promocion'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria', 'marca', 'proveedor', 'promocion'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async getComboItems(comboId: number): Promise<ComboProducto[]> {
    return this.comboProductoRepository.find({
      where: { comboId },
      relations: ['producto', 'producto.categoria', 'producto.marca'],
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto & { items?: { productoId: number; cantidad: number }[] }): Promise<Producto> {
    const { items, ...prodData } = updateProductoDto;
    const producto = await this.findOne(id);
    Object.assign(producto, prodData);
    this.synchronizePrices(producto);
    const saved = await this.productoRepository.save(producto);

    if (saved.esCombo && items) {
      // Borrar antiguos componentes
      await this.comboProductoRepository.delete({ comboId: saved.id });
      // Guardar nuevos componentes
      for (const item of items) {
        const comboItem = this.comboProductoRepository.create({
          comboId: saved.id,
          productoId: item.productoId,
          cantidad: item.cantidad,
        });
        await this.comboProductoRepository.save(comboItem);
      }
    }
    return saved;
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.softRemove(producto);
  }

  async buscar(termino: string): Promise<Producto[]> {
    return this.productoRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .leftJoinAndSelect('producto.marca', 'marca')
      .leftJoinAndSelect('producto.promocion', 'promocion')
      .where('producto.nombre ILIKE :termino', { termino: `%${termino}%` })
      .orWhere('producto.codigo ILIKE :termino', { termino: `%${termino}%` })
      .getMany();
  }

  async getBajoStock(): Promise<Producto[]> {
    return this.productoRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .leftJoinAndSelect('producto.marca', 'marca')
      .where('producto.stock <= producto.stockMinimo')
      .andWhere('producto.estado = true')
      .getMany();
  }
}
