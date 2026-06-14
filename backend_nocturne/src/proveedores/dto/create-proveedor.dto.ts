import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProveedorDto {
  @ApiProperty({ example: 'Distribuidora Central' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: '1234567890', required: false })
  @IsString()
  @IsOptional()
  nit?: string;

  @ApiProperty({ example: '70012345', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: 'proveedor@email.com', required: false })
  @IsOptional()
  correo?: string;

  @ApiProperty({ example: 'Av. Principal #123', required: false })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
