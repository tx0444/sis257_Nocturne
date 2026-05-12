import { Venta } from '../../ventas/entities/venta.entity';
export declare class Cliente {
    id: number;
    nombre: string;
    nit: string;
    ci: string;
    direccion: string;
    telefono: string;
    email: string;
    puntosFidelidad: number;
    credito: number;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    ventas: Venta[];
}
