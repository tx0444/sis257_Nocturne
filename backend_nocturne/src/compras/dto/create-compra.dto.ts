import { IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetalleCompraDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productoId: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  cantidad: number;

  @ApiProperty({ example: 8.50 })
  @IsNumber()
  precio: number;
}

export class CreateCompraDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  proveedorId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  usuarioId: number;

  @ApiProperty({ type: [CreateDetalleCompraDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleCompraDto)
  detalles: CreateDetalleCompraDto[];
}
