import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarritoItem } from './entities/carrito-item.entity';
import { Producto } from '../productos/entities/producto.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(CarritoItem)
    private carritoRepository: Repository<CarritoItem>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async getCarrito(usuarioId: number) {
    const items = await this.carritoRepository.find({
      where: { usuarioId },
      relations: ['producto'],
      order: { createdAt: 'DESC' },
    });

    const subtotal = items.reduce((sum, item) => {
      return sum + (item.precioUnitario * item.cantidad);
    }, 0);

    return {
      items,
      cantidad_items: items.length,
      subtotal,
    };
  }

  async addItem(usuarioId: number, dto: AddToCartDto) {
    const producto = await this.productoRepository.findOne({
      where: { id: dto.productoId, activo: true },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Check if item already exists in cart
    const existingItem = await this.carritoRepository.findOne({
      where: { usuarioId, productoId: dto.productoId },
    });

    if (existingItem) {
      // Update quantity
      existingItem.cantidad += dto.cantidad;
      return this.carritoRepository.save(existingItem);
    }

    // Create new item
    const item = this.carritoRepository.create({
      usuarioId,
      productoId: dto.productoId,
      cantidad: dto.cantidad,
      precioUnitario: producto.precioVenta,
    });

    return this.carritoRepository.save(item);
  }

  async updateItem(usuarioId: number, productoId: number, dto: UpdateCartItemDto) {
    const item = await this.carritoRepository.findOne({
      where: { usuarioId, productoId },
    });

    if (!item) {
      throw new NotFoundException('Item no encontrado en el carrito');
    }

    item.cantidad = dto.cantidad;
    return this.carritoRepository.save(item);
  }

  async removeItem(usuarioId: number, productoId: number) {
    const item = await this.carritoRepository.findOne({
      where: { usuarioId, productoId },
    });

    if (!item) {
      throw new NotFoundException('Item no encontrado en el carrito');
    }

    await this.carritoRepository.remove(item);
    return { message: 'Item eliminado del carrito' };
  }

  async clearCart(usuarioId: number) {
    await this.carritoRepository.delete({ usuarioId });
    return { message: 'Carrito vaciado' };
  }
}