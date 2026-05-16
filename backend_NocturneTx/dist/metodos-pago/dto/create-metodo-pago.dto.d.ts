import { TipoMetodo, EstadoMetodoPago } from '../entities/metodo-pago.entity';
export declare class CreateMetodoPagoDto {
    nombre: string;
    tipo: TipoMetodo;
    descripcion?: string;
    comisionPorcentaje?: number;
    comisionFija?: number;
    tiempoConfirmacion?: string;
    requiereVerificacion?: boolean;
    permiteParcial?: boolean;
    activo?: boolean;
    estado?: EstadoMetodoPago;
}
