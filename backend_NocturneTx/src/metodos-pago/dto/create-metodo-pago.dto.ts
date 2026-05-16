import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { TipoMetodo, EstadoMetodoPago } from '../entities/metodo-pago.entity';

export class CreateMetodoPagoDto {
  @IsString()
  nombre: string;

  @IsEnum(TipoMetodo)
  tipo: TipoMetodo;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  comisionPorcentaje?: number;

  @IsOptional()
  @IsNumber()
  comisionFija?: number;

  @IsOptional()
  @IsString()
  tiempoConfirmacion?: string;

  @IsOptional()
  @IsBoolean()
  requiereVerificacion?: boolean;

  @IsOptional()
  @IsBoolean()
  permiteParcial?: boolean;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsEnum(EstadoMetodoPago)
  estado?: EstadoMetodoPago;
}