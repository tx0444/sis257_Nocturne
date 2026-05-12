import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateRolDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsOptional()
  permisos?: string[];
}

export class UpdateRolDto extends PartialType(CreateRolDto) {}

