export declare class CreateProductoDto {
    nombre: string;
    descripcion?: string;
    gradoAlcoholico?: number;
    requiereFrio?: boolean;
    precioCompra?: number;
    precioVenta: number;
    unidad?: string;
    codigoBarras?: string;
    imagenUrl?: string;
    categoriaId?: number;
    proveedorId?: number;
}
declare const UpdateProductoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductoDto>>;
export declare class UpdateProductoDto extends UpdateProductoDto_base {
    activo?: boolean;
}
export {};
