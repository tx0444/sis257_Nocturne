import { IsString, IsOptional, IsBoolean, IsNumber, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromocionDto {
  @ApiProperty({ example: 'Fin de Año Premium' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: '15% de descuento en whiskies seleccionados', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 15.00 })
  @IsNumber()
  descuento: number;

  @ApiProperty({ example: '2026-12-01T00:00:00Z' })
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({ example: '2026-12-31T23:59:59Z' })
  @IsDateString()
  fechaFin: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;

  @ApiProperty({ example: [1, 2], required: false, type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  productoIds?: number[];
}
