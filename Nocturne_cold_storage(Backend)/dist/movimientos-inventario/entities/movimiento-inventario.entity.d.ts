import { Inventario } from '../../inventarios/entities/inventario.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare enum TipoMovimiento {
    ENTRADA = "entrada",
    SALIDA = "salida",
    MERMA = "merma",
    AJUSTE = "ajuste"
}
export declare class MovimientoInventario {
    id: number;
    tipo: TipoMovimiento;
    cantidad: number;
    cantidadAntes: number;
    cantidadDespues: number;
    precioUnitario: number;
    motivo: string;
    numeroDocumento: string;
    observaciones: string;
    origenTipo: string;
    origenId: number;
    fechaMovimiento: Date;
    createdAt: Date;
    updatedAt: Date;
    inventario: Inventario;
    inventarioId: number;
    venta: Venta;
    ventaId: number;
    usuario: Usuario;
    usuarioId: number;
}
