import { Producto } from '../../productos/entities/producto.entity';
export declare class Tasacion {
    id: number;
    producto: Producto;
    productoId: number;
    valorTasacion: number;
    tendencia: string;
    fechaTasacion: Date;
}
