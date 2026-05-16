import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class CarritoItem {
    id: number;
    cantidad: number;
    precioUnitario: number;
    createdAt: Date;
    updatedAt: Date;
    usuario: Usuario;
    usuarioId: number;
    producto: Producto;
    productoId: number;
}
