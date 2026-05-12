import { CarritoService } from './carrito.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';
export declare class CarritoController {
    private readonly carritoService;
    constructor(carritoService: CarritoService);
    getCarrito(req: any): Promise<{
        items: import("./entities/carrito-item.entity").CarritoItem[];
        cantidad_items: number;
        subtotal: number;
    }>;
    addItem(req: any, dto: AddToCartDto): Promise<import("./entities/carrito-item.entity").CarritoItem>;
    updateItem(req: any, productoId: string, dto: UpdateCartItemDto): Promise<import("./entities/carrito-item.entity").CarritoItem>;
    removeItem(req: any, productoId: string): Promise<{
        message: string;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
}
