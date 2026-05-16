import { AccionBitacora } from '../entities/bitacora.entity';
export declare class CreateBitacoraDto {
    accion: AccionBitacora;
    nombreTabla: string;
    idRegistro?: number;
    datosAnteriores?: any;
    datosNuevos?: any;
    descripcion?: string;
    usuarioId?: number;
}
