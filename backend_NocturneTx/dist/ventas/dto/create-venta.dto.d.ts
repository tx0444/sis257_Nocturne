import { TipoEntrega, MetodoPago, EstadoVenta } from '../../ventas/entities/venta.entity';
export declare class DetalleVentaItemDto {
    productoId: number;
    cantidad: number;
    precioUnitario: number;
    descuento?: number;
    inventarioId?: number;
}
export declare class CreateVentaDto {
    tipoEntrega: TipoEntrega;
    direccionEntrega?: string;
    telefonoEntrega?: string;
    referenciaEntrega?: string;
    metodoPago: MetodoPago;
    clienteId?: number;
    detalles: DetalleVentaItemDto[];
    usuarioId?: number;
    descuento?: number;
}
export declare class UpdateVentaDto {
    estado: EstadoVenta;
    observaciones?: string;
}
