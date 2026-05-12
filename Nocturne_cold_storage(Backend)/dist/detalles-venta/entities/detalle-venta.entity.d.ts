import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Inventario } from '../../inventarios/entities/inventario.entity';
export declare enum TemperaturaBebida {
    NATURAL = "natural",
    FRIA = "fria"
}
export declare class DetalleVenta {
    id: number;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    subtotal: number;
    numeroLote: string;
    temperaturaSeleccionada: TemperaturaBebida;
    observaciones: string;
    venta: Venta;
    ventaId: number;
    producto: Producto;
    productoId: number;
    inventario: Inventario;
    inventarioId: number;
}
