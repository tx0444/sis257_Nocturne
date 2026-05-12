import { Producto } from '../../productos/entities/producto.entity';
export declare class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    imagenUrl: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    productos: Producto[];
}
