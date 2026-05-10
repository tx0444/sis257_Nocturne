import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  nit?: string;

  @IsString()
  @IsOptional()
  ci?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  email?: string;
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
