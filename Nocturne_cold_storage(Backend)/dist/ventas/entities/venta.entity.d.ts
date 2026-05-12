import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetalleVenta } from '../../detalles-venta/entities/detalle-venta.entity';
import { MovimientoInventario } from '../../movimientos-inventario/entities/movimiento-inventario.entity';
export declare enum MetodoPago {
    EFECTIVO = "efectivo",
    TARJETA = "tarjeta",
    QR = "qr",
    MIXTO = "mixto"
}
export declare enum EstadoVenta {
    PENDIENTE = "pendiente",
    EN_CAMINO = "en_camino",
    COMPLETADA = "completada",
    CANCELADA = "cancelada",
    ANULADA = "anulada"
}
export declare enum TipoEntrega {
    DOMICILIO = "domicilio",
    RECOJO = "recojo"
}
export declare class Venta {
    id: number;
    numeroFactura: string;
    subtotal: number;
    descuento: number;
    impuesto: number;
    total: number;
    montoEntregado: number;
    cambioDevuelto: number;
    metodoPago: MetodoPago;
    estado: EstadoVenta;
    serie: string;
    numeroAutorizacion: string;
    observaciones: string;
    fechaVenta: Date;
    createdAt: Date;
    updatedAt: Date;
    cliente: Cliente;
    clienteId: number;
    usuario: Usuario;
    usuarioId: number;
    detalles: DetalleVenta[];
    movimientos: MovimientoInventario[];
    tipoEntrega: TipoEntrega;
    direccionEntrega: string;
    telefonoEntrega: string;
    referenciaEntrega: string;
}
