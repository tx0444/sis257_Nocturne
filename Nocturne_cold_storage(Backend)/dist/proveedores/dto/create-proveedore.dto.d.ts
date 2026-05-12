export declare class CreateProveedoreDto {
    nombre: string;
    nit?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
    personaContacto?: string;
    observaciones?: string;
}
declare const UpdateProveedoreDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProveedoreDto>>;
export declare class UpdateProveedoreDto extends UpdateProveedoreDto_base {
    activo?: boolean;
}
export {};
