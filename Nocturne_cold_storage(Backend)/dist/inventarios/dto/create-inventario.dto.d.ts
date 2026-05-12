export declare class CreateInventarioDto {
    numeroLote: string;
    cantidad: number;
    fechaVencimiento?: string;
    fechaEntrada?: string;
    precioUnitario?: number;
    estado?: string;
    observaciones?: string;
    productoId: number;
}
declare const UpdateInventarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateInventarioDto>>;
export declare class UpdateInventarioDto extends UpdateInventarioDto_base {
}
export {};
