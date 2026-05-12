export declare class CreateRolDto {
    nombre: string;
    descripcion?: string;
    permisos?: string[];
}
declare const UpdateRolDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRolDto>>;
export declare class UpdateRolDto extends UpdateRolDto_base {
}
export {};
