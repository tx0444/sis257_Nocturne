import { Producto } from '../../productos/entities/producto.entity';
export declare class Proveedor {
    id: number;
    nombre: string;
    nit: string;
    direccion: string;
    telefono: string;
    email: string;
    personaContacto: string;
    observaciones: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    productos: Producto[];
}
