export declare class CreateUsuarioDto {
    nombre: string;
    email: string;
    password: string;
    telefono?: string;
    direccion?: string;
    fotoUrl?: string;
    rolId: number;
}
declare const UpdateUsuarioDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    activo?: boolean;
}
export {};
