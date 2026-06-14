import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'María' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'García' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: '12345678', required: false })
  @IsString()
  @IsOptional()
  ciNit?: string;

  @ApiProperty({ example: '70098765', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: 'maria@email.com', required: false })
  @IsString()
  @IsOptional()
  correo?: string;

  @ApiProperty({ example: 'Calle Bolívar #456', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
