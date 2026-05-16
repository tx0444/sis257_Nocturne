import { PartialType } from '@nestjs/swagger';
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

