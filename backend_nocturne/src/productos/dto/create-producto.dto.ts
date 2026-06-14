import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ example: 'Paceña 620ml' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Cerveza rubia boliviana', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'PROD-001' })
  @IsString()
  codigo: string;

  @ApiProperty({ example: 8.50 })
  @IsNumber()
  precioCompra: number;

  @ApiProperty({ example: 12.00 })
  @IsNumber()
  precioVenta: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  stockMinimo?: number;

  @ApiProperty({ example: 'https://ejemplo.com/imagen.jpg', required: false })
  @IsString()
  @IsOptional()
  imagen?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;

  @ApiProperty({ example: 'Botella', required: false })
  @IsString()
  @IsOptional()
  unidadMedida?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  vendePorUnidad?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  vendePorCaja?: boolean;

  @ApiProperty({ example: 6, required: false })
  @IsNumber()
  @IsOptional()
  unidadesPorCaja?: number;

  @ApiProperty({ example: 100.00, required: false })
  @IsNumber()
  @IsOptional()
  precioCaja?: number;

  @ApiProperty({ example: 8.50, required: false })
  @IsNumber()
  @IsOptional()
  precioCompraUnidad?: number;

  @ApiProperty({ example: 51.00, required: false })
  @IsNumber()
  @IsOptional()
  precioCompraCaja?: number;

  @ApiProperty({ example: 12.00, required: false })
  @IsNumber()
  @IsOptional()
  precioVentaUnidad?: number;

  @ApiProperty({ example: 72.00, required: false })
  @IsNumber()
  @IsOptional()
  precioVentaCaja?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoriaId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  marcaId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  proveedorId?: number;

  @ApiProperty({ example: 'Alcoholica', required: false })
  @IsString()
  @IsOptional()
  tipoBebida?: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  esCombo?: boolean;

  @ApiProperty({ example: [{ productoId: 1, cantidad: 2 }], required: false })
  @IsOptional()
  items?: any[];
}
