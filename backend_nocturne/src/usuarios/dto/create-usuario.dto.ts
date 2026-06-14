import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
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

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  rolId: number;
}
