export declare class CreateDetallesVentaDto {
    cantidad: number;
    precioUnitario: number;
    descuento?: number;
    ventaId: number;
    productoId: number;
    inventarioId: number;
    numeroLote?: string;
    observaciones?: string;
}
declare const UpdateDetallesVentaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDetallesVentaDto>>;
export declare class UpdateDetallesVentaDto extends UpdateDetallesVentaDto_base {
}
export {};
