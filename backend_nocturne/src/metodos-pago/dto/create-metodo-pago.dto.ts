import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetodoPagoDto {
  @ApiProperty({ example: 'Efectivo' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Pago en efectivo', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
