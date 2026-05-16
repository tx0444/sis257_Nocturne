export declare class CreateClienteDto {
    nombre: string;
    nit?: string;
    ci?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
}
declare const UpdateClienteDto_base: import("@nestjs/common").Type<Partial<CreateClienteDto>>;
export declare class UpdateClienteDto extends UpdateClienteDto_base {
    activo?: boolean;
}
export {};
