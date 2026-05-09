export declare enum TipoMetodo {
    EFECTIVO = "efectivo",
    TARJETA_DEBITO = "tarjeta_debito",
    TARJETA_CREDITO = "tarjeta_credito",
    TRANSFERENCIA = "transferencia",
    NEQUI = "nequi",
    DAVIPLATA = "daviplata",
    PAYPAL = "paypal",
    MERCADO_PAGO = "mercado_pago",
    QR = "qr",
    CONTRA_ENTREGA = "contra_entrega",
    MIXTO = "mixto"
}
export declare enum EstadoMetodoPago {
    ACTIVO = "activo",
    INACTIVO = "inactivo"
}
export declare class MetodoPago {
    id: number;
    nombre: string;
    tipo: TipoMetodo;
    descripcion: string;
    comisionPorcentaje: number;
    comisionFija: number;
    tiempoConfirmacion: string;
    requiereVerificacion: boolean;
    permiteParcial: boolean;
    activo: boolean;
    estado: EstadoMetodoPago;
    createdAt: Date;
    updatedAt: Date;
}
