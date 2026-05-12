import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { TipoDescuento } from '../entities/promocion.entity';

export class CreatePromocionDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(TipoDescuento)
  tipoDescuento: TipoDescuento;

  @IsNumber()
  valorDescuento: number;

  @IsDateString()
  fechaInicio: Date;

  @IsDateString()
  fechaFin: Date;

  @IsOptional()
  @IsBoolean()
  activa?: boolean;

  @IsOptional()
  @IsNumber()
  categoriaId?: number;

  @IsOptional()
  @IsNumber()
  productoId?: number;
}
