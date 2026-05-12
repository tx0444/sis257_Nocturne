import { Cliente } from '../../clientes/entities/cliente.entity';
export declare class AlertaSeguridad {
    id: number;
    cliente: Cliente;
    clienteId: number;
    tipoAlerta: string;
    mensaje: string;
    leido: boolean;
    fechaAlerta: Date;
}
