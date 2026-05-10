import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  imagenUrl?: string;
}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @IsOptional()
  activo?: boolean;
}