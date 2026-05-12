import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  fotoUrl?: string;

  @IsInt()
  rolId: number;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

