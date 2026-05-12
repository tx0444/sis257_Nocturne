import { Producto } from '../../productos/entities/producto.entity';
import { MovimientoInventario } from '../../movimientos-inventario/entities/movimiento-inventario.entity';
export declare class Inventario {
    id: number;
    numeroLote: string;
    cantidad: number;
    cantidadOriginal: number;
    fechaVencimiento: Date;
    fechaEntrada: Date;
    precioUnitario: number;
    estado: string;
    observaciones: string;
    createdAt: Date;
    updatedAt: Date;
    producto: Producto;
    productoId: number;
    movimientos: MovimientoInventario[];
}
