import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  numeroLote: string;

  @IsNumber()
  cantidad: number;

  @IsDateString()
  @IsOptional()
  fechaVencimiento?: string;

  @IsDateString()
  @IsOptional()
  fechaEntrada?: string;

  @IsNumber()
  @IsOptional()
  precioUnitario?: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsNumber()
  productoId: number;
}

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {}

