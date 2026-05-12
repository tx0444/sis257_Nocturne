import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDireccionDto {
  @ApiProperty({ example: 'Mi Casa' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Av. 6 de Agosto #123, La Paz' })
  @IsString()
  direccion: string;

  @ApiProperty({ example: '70012345', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'Cerca al parque central', required: false })
  @IsOptional()
  @IsString()
  referencia?: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  esDefault?: boolean;
}