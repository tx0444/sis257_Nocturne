import { TipoFactura, OrigenFactura } from '../entities/factura.entity';
export declare class CreateFacturaDto {
    tipo?: TipoFactura;
    origen?: OrigenFactura;
    prefijo?: string;
    clienteId?: number;
    ventaId?: number;
    nombreCliente?: string;
    nitCliente?: string;
    direccionCliente?: string;
    telefonoCliente?: string;
    emailCliente?: string;
    descuento?: number;
    porcentajeImpuesto?: number;
    observaciones?: string;
    fechaVencimiento?: string;
    facturaRelacionadaId?: number;
}
export declare class CreateDetalleFacturaDto {
    descripcion: string;
    referencia?: string;
    cantidad: number;
    unidadMedida?: string;
    precioUnitario: number;
    descuento?: number;
    productoId?: number;
    porcentajeImpuesto?: number;
}
