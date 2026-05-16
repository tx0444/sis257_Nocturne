import { Cliente } from '../../clientes/entities/cliente.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class Boveda {
    id: number;
    cliente: Cliente;
    clienteId: number;
    producto: Producto;
    productoId: number;
    numeroSerie: string;
    ubicacionFisica: string;
    estado: string;
    fechaAdquisicion: Date;
    updatedAt: Date;
}
