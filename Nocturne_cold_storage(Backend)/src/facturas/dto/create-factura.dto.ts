import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { TipoFactura, EstadoFactura, OrigenFactura } from '../entities/factura.entity';

export class CreateFacturaDto {
  @IsOptional()
  @IsEnum(TipoFactura)
  tipo?: TipoFactura;

  @IsOptional()
  @IsEnum(OrigenFactura)
  origen?: OrigenFactura;

  @IsOptional()
  @IsString()
  prefijo?: string;

  @IsOptional()
  @IsNumber()
  clienteId?: number;

  @IsOptional()
  @IsNumber()
  ventaId?: number;

  @IsOptional()
  @IsString()
  nombreCliente?: string;

  @IsOptional()
  @IsString()
  nitCliente?: string;

  @IsOptional()
  @IsString()
  direccionCliente?: string;

  @IsOptional()
  @IsString()
  telefonoCliente?: string;

  @IsOptional()
  @IsString()
  emailCliente?: string;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsOptional()
  @IsNumber()
  porcentajeImpuesto?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;

  @IsOptional()
  @IsNumber()
  facturaRelacionadaId?: number;
}

export class CreateDetalleFacturaDto {
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  unidadMedida?: string;

  @IsNumber()
  precioUnitario: number;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsOptional()
  @IsNumber()
  productoId?: number;

  @IsOptional()
  @IsNumber()
  porcentajeImpuesto?: number;
}