import { IsEnum, IsInt, IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { TipoMovimiento } from '../entities/movimiento-inventario.entity';

export class CreateMovimientoInventarioDto {
  @IsEnum(TipoMovimiento)
  tipo: TipoMovimiento;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @IsOptional()
  precioUnitario?: number;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsString()
  @IsOptional()
  numeroDocumento?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsString()
  @IsOptional()
  origenTipo?: string;

  @IsInt()
  @IsOptional()
  origenId?: number;

  @IsInt()
  inventarioId: number;

  @IsInt()
  @IsOptional()
  ventaId?: number;

  @IsInt()
  @IsOptional()
  usuarioId?: number;
}