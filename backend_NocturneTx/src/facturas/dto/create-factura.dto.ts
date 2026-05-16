import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoFactura, OrigenFactura } from '../entities/factura.entity';

export class CreateFacturaDto {
  @ApiPropertyOptional({ enum: TipoFactura })
  @IsOptional()
  @IsEnum(TipoFactura)
  tipo?: TipoFactura;

  @ApiPropertyOptional({ enum: OrigenFactura })
  @IsOptional()
  @IsEnum(OrigenFactura)
  origen?: OrigenFactura;

  @ApiPropertyOptional({ example: 'FAC' })
  @IsOptional()
  @IsString()
  prefijo?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  clienteId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  ventaId?: number;

  @ApiPropertyOptional({ example: 'Juan Pérez' })
  @IsOptional()
  @IsString()
  nombreCliente?: string;

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @IsString()
  nitCliente?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  direccionCliente?: string;

  @ApiPropertyOptional({ example: '70012345' })
  @IsOptional()
  @IsString()
  telefonoCliente?: string;

  @ApiPropertyOptional({ example: 'cliente@email.com' })
  @IsOptional()
  @IsString()
  emailCliente?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  descuento?: number;

  @ApiPropertyOptional({ example: 13 })
  @IsOptional()
  @IsNumber()
  porcentajeImpuesto?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiPropertyOptional({ example: '2026-12-31' })
  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  facturaRelacionadaId?: number;
}

export class CreateDetalleFacturaDto {
  @ApiProperty({ example: 'Whisky 750ml' })
  @IsString()
  descripcion: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  referencia?: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  cantidad: number;

  @ApiPropertyOptional({ example: 'unidad' })
  @IsOptional()
  @IsString()
  unidadMedida?: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  precioUnitario: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  descuento?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  productoId?: number;

  @ApiPropertyOptional({ example: 13 })
  @IsOptional()
  @IsNumber()
  porcentajeImpuesto?: number;
}
