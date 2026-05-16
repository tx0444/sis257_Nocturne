import { IsEnum, IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoEntrega, MetodoPago, EstadoVenta } from '../../ventas/entities/venta.entity';

export class DetalleVentaItemDto {
  @ApiProperty()
  @IsNumber()
  productoId: number;

  @ApiProperty()
  @IsNumber()
  cantidad: number;

  @ApiProperty()
  @IsNumber()
  precioUnitario: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  descuento?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  inventarioId?: number;
}

export class CreateVentaDto {
  @ApiProperty({ enum: TipoEntrega, example: 'domicilio' })
  @IsEnum(TipoEntrega)
  tipoEntrega: TipoEntrega;

  @ApiProperty({ example: 'Av. 6 de Agosto #123, La Paz', required: false })
  @IsOptional()
  @IsString()
  direccionEntrega?: string;

  @ApiProperty({ example: '70012345', required: false })
  @IsOptional()
  @IsString()
  telefonoEntrega?: string;

  @ApiProperty({ example: 'Cerca al parque', required: false })
  @IsOptional()
  @IsString()
  referenciaEntrega?: string;

  @ApiProperty({ enum: MetodoPago, example: 'efectivo' })
  @IsEnum(MetodoPago)
  metodoPago: MetodoPago;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  clienteId?: number;

  @ApiProperty({ type: [DetalleVentaItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaItemDto)
  detalles: DetalleVentaItemDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  usuarioId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  descuento?: number;
}

export class UpdateVentaDto {
  @ApiProperty({ enum: EstadoVenta, example: 'en_camino' })
  @IsEnum(EstadoVenta)
  estado: EstadoVenta;

  @IsOptional()
  @IsString()
  observaciones?: string;
}