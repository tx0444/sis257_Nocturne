import { Repository } from 'typeorm';
import { CarritoItem } from './entities/carrito-item.entity';
import { Producto } from '../productos/entities/producto.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';
export declare class CarritoService {
    private carritoRepository;
    private productoRepository;
    constructor(carritoRepository: Repository<CarritoItem>, productoRepository: Repository<Producto>);
    getCarrito(usuarioId: number): Promise<{
        items: CarritoItem[];
        cantidad_items: number;
        subtotal: number;
    }>;
    addItem(usuarioId: number, dto: AddToCartDto): Promise<CarritoItem>;
    updateItem(usuarioId: number, productoId: number, dto: UpdateCartItemDto): Promise<CarritoItem>;
    removeItem(usuarioId: number, productoId: number): Promise<{
        message: string;
    }>;
    clearCart(usuarioId: number): Promise<{
        message: string;
    }>;
}
