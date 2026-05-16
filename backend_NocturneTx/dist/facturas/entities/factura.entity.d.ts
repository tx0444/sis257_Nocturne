import { Venta } from '../../ventas/entities/venta.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare enum TipoFactura {
    FACTURA = "factura",
    NOTA_CREDITO = "nota_credito",
    NOTA_DEBITO = "nota_debito",
    TICKET = "ticket",
    COTIZACION = "cotizacion"
}
export declare enum EstadoFactura {
    BORRADOR = "borrador",
    EMITIDA = "emitida",
    ANULADA = "anulada",
    RECHAZADA = "rechazada",
    VALIDADA = "validada"
}
export declare enum OrigenFactura {
    VENTA = "venta",
    DEVOLUCION = "devolucion",
    AJUSTE = "ajuste",
    COTIZACION = "cotizacion"
}
export declare class Factura {
    id: number;
    numeroFactura: string;
    prefijo: string;
    numeroConsecutivo: string;
    tipo: TipoFactura;
    estado: EstadoFactura;
    origen: OrigenFactura;
    nombreCliente: string;
    nitCliente: string;
    direccionCliente: string;
    telefonoCliente: string;
    emailCliente: string;
    subtotal: number;
    descuento: number;
    subtotalNeto: number;
    baseImpuesto: number;
    impuesto: number;
    porcentajeImpuesto: number;
    total: number;
    cufe: string;
    fechaEmisionDian: Date;
    qrCode: string;
    urlVerificacion: string;
    motivoAnulacion: string;
    fechaAnulacion: Date;
    observaciones: string;
    terminosCondiciones: string;
    fechaVencimiento: Date;
    fechaEmision: Date;
    createdAt: Date;
    updatedAt: Date;
    venta: Venta;
    ventaId: number;
    cliente: Cliente;
    clienteId: number;
    facturaRelacionada: Factura;
    facturaRelacionadaId: number;
    usuario: Usuario;
    usuarioId: number;
}
