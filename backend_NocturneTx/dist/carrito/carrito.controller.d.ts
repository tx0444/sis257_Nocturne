import { CarritoService } from './carrito.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/add-to-cart.dto';
export declare class CarritoController {
    private readonly carritoService;
    constructor(carritoService: CarritoService);
    getCarrito(req: {
        user: {
            userId: number;
        };
    }): Promise<{
        items: import("./entities/carrito-item.entity").CarritoItem[];
        cantidad_items: number;
        subtotal: number;
    }>;
    addItem(req: {
        user: {
            userId: number;
        };
    }, dto: AddToCartDto): Promise<import("./entities/carrito-item.entity").CarritoItem>;
    updateItem(req: {
        user: {
            userId: number;
        };
    }, productoId: string, dto: UpdateCartItemDto): Promise<import("./entities/carrito-item.entity").CarritoItem>;
    removeItem(req: {
        user: {
            userId: number;
        };
    }, productoId: string): Promise<{
        message: string;
    }>;
    clearCart(req: {
        user: {
            userId: number;
        };
    }): Promise<{
        message: string;
    }>;
}
