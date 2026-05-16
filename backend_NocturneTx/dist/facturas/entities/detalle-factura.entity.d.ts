import { Factura } from './factura.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare class DetalleFactura {
    id: number;
    descripcion: string;
    referencia: string;
    cantidad: number;
    unidadMedida: string;
    precioUnitario: number;
    descuento: number;
    subtotal: number;
    baseImpuesto: number;
    porcentajeImpuesto: number;
    impuesto: number;
    total: number;
    createdAt: Date;
    factura: Factura;
    facturaId: number;
    producto: Producto;
    productoId: number;
}
