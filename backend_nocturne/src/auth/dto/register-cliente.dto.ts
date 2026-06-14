import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterClienteDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'jperez' })
  @IsString()
  usuario: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: '1234567', required: false })
  @IsString()
  @IsOptional()
  ciNit?: string;

  @ApiProperty({ example: '71234567', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: 'Calle Falsa 123', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;
}
