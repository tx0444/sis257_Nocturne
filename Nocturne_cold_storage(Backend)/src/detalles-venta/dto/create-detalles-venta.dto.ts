import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDetallesVentaDto {
  @IsNumber()
  cantidad: number;

  @IsNumber()
  precioUnitario: number;

  @IsNumber()
  @IsOptional()
  descuento?: number;

  @IsNumber()
  ventaId: number;

  @IsNumber()
  productoId: number;

  @IsNumber()
  inventarioId: number;

  @IsString()
  @IsOptional()
  numeroLote?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class UpdateDetallesVentaDto extends PartialType(CreateDetallesVentaDto) {}

