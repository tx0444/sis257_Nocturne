import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { MetodoPago } from '../entities/venta.entity';

const toDateOrUndefined = (value: unknown): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return undefined;
};

const toTrimmedStringOrNull = (value: unknown): string | null => {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    const coerced = value.toString().trim();
    return coerced.length > 0 ? coerced : null;
  }
  if (typeof value === 'bigint') return value.toString();
  return null;
};

class VentaItemDto {
  @IsNumber()
  productoId: number;

  @IsNumber()
  @Min(1)
  cantidad: number;
}

export class CreateVentaDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  readonly empleadoId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  readonly clienteId?: number | null;

  @IsOptional()
  @Transform(({ value }) => toDateOrUndefined(value))
  readonly fechaVenta?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly total?: number;

  @IsNotEmpty({ message: 'El método de pago es requerido' })
  @IsEnum(MetodoPago, {
    message: 'El método de pago debe ser: efectivo, tarjeta, transferencia o qr',
  })
  readonly metodoPago: MetodoPago;

  @IsOptional()
  @IsString({ message: 'El nombre del cliente debe ser un texto' })
  @MaxLength(100)
  @Transform(({ value }) => toTrimmedStringOrNull(value))
  readonly clienteNombre?: string | null;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser un texto' })
  @Transform(({ value }) => toTrimmedStringOrNull(value))
  readonly notas?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VentaItemDto)
  readonly items?: VentaItemDto[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly montoRecibido?: number;
}
