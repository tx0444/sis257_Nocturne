import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  gradoAlcoholico?: number;

  @IsBoolean()
  @IsOptional()
  requiereFrio?: boolean;

  @IsNumber()
  @IsOptional()
  precioCompra?: number;

  @IsNumber()
  precioVenta: number;

  @IsString()
  @IsOptional()
  unidad?: string;

  @IsString()
  @IsOptional()
  codigoBarras?: string;

  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;

  @IsNumber()
  @IsOptional()
  proveedorId?: number;
}

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
