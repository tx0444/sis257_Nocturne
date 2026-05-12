import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoVenta } from '../../ventas/entities/venta.entity';

export class UpdateVentaDto {
  @ApiProperty({ enum: EstadoVenta, example: 'en_camino' })
  @IsEnum(EstadoVenta)
  estado: EstadoVenta;

  @IsOptional()
  @IsString()
  observaciones?: string;
}