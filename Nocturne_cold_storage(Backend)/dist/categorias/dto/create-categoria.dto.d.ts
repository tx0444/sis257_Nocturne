export declare class CreateCategoriaDto {
    nombre: string;
    descripcion?: string;
    imagenUrl?: string;
}
declare const UpdateCategoriaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoriaDto>>;
export declare class UpdateCategoriaDto extends UpdateCategoriaDto_base {
    activo?: boolean;
}
export {};
