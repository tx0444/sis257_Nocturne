import { TipoMovimiento } from '../entities/movimiento-inventario.entity';
export declare class CreateMovimientoInventarioDto {
    tipo: TipoMovimiento;
    cantidad: number;
    precioUnitario?: number;
    motivo?: string;
    numeroDocumento?: string;
    observaciones?: string;
    origenTipo?: string;
    origenId?: number;
    inventarioId: number;
    ventaId?: number;
    usuarioId?: number;
}
