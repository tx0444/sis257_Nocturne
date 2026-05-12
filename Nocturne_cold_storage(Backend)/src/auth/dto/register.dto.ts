import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'ElJuan123', required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ example: 'juan@ejemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '70012345', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'Av. 6 de Agosto #123', required: false })
  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  rolId?: number;
}