import { IsEnum, IsInt, IsOptional, IsObject, IsString } from 'class-validator';
import { AccionBitacora } from '../entities/bitacora.entity';

export class CreateBitacoraDto {
  @IsEnum(AccionBitacora)
  accion: AccionBitacora;

  @IsString()
  nombreTabla: string;

  @IsInt()
  @IsOptional()
  idRegistro?: number;

  @IsObject()
  @IsOptional()
  datosAnteriores?: any;

  @IsObject()
  @IsOptional()
  datosNuevos?: any;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @IsOptional()
  usuarioId?: number;
}