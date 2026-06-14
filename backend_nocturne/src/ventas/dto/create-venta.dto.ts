import { IsNumber, IsArray, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComboComponenteDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  productoId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  cantidad: number;
}

export class CreateDetalleVentaDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productoId: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  cantidad: number;

  @ApiProperty({ example: 12.00 })
  @IsNumber()
  precio: number;

  @ApiPropertyOptional({ example: 'Unidad' })
  @IsString()
  @IsOptional()
  tipoVenta?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  conHielo?: boolean;

  @ApiPropertyOptional({ type: [CreateComboComponenteDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateComboComponenteDto)
  componentes?: CreateComboComponenteDto[];
}

export class CreatePagoVentaDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  metodoPagoId: number;

  @ApiProperty({ example: 36.00 })
  @IsNumber()
  monto: number;

  @ApiPropertyOptional({ example: 50.00 })
  @IsNumber()
  @IsOptional()
  montoRecibido?: number;

  @ApiPropertyOptional({ example: 14.00 })
  @IsNumber()
  @IsOptional()
  cambio?: number;
}

export class CreateVentaDto {
  @ApiPropertyOptional({ example: 1, description: 'ID del cliente. Si se omite, se usa Consumidor Final (NIT: 0)' })
  @IsNumber()
  @IsOptional()
  clienteId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  usuarioId: number;

  @ApiPropertyOptional({ example: '/uploads/comprobantes/qr-12345.jpg', description: 'URL del comprobante QR de pago' })
  @IsString()
  @IsOptional()
  comprobanteQr?: string;

  @ApiPropertyOptional({ example: 'Av. Las Americas #123', description: 'Dirección de entrega' })
  @IsString()
  @IsOptional()
  direccionEntrega?: string;

  @ApiPropertyOptional({ example: 'Tienda', description: 'Tipo de entrega: Tienda o Delivery' })
  @IsString()
  @IsOptional()
  tipoEntrega?: string;

  @ApiPropertyOptional({ example: 'Av. Las Americas #123', description: 'Dirección de delivery' })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiPropertyOptional({ example: 'Frente a la plaza principal', description: 'Referencia de delivery' })
  @IsString()
  @IsOptional()
  referencia?: string;

  @ApiPropertyOptional({ example: '71234567', description: 'Teléfono de contacto para delivery' })
  @IsString()
  @IsOptional()
  telefonoContacto?: string;

  @ApiPropertyOptional({ example: 10.00, description: 'Costo del delivery' })
  @IsNumber()
  @IsOptional()
  costoDelivery?: number;

  @ApiPropertyOptional({ example: -19.0429, description: 'Latitud de la ubicación de entrega' })
  @IsNumber()
  @IsOptional()
  latitud?: number;

  @ApiPropertyOptional({ example: -65.2554, description: 'Longitud de la ubicación de entrega' })
  @IsNumber()
  @IsOptional()
  longitud?: number;

  @ApiProperty({ type: [CreateDetalleVentaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleVentaDto)
  detalles: CreateDetalleVentaDto[];

  @ApiProperty({ type: [CreatePagoVentaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePagoVentaDto)
  pagos: CreatePagoVentaDto[];

  @ApiPropertyOptional({ example: 'Pendiente', description: 'Estado inicial de la venta' })
  @IsString()
  @IsOptional()
  estado?: string;
}
