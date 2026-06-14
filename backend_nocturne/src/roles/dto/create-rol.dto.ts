import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Administrador del sistema', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
