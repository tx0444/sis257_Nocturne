import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateProveedoreDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  nit?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  personaContacto?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class UpdateProveedoreDto extends PartialType(CreateProveedoreDto) {
  @IsOptional()
  activo?: boolean;
}

