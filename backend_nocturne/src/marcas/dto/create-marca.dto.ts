import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMarcaDto {
  @ApiProperty({ example: 'Paceña' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Bolivia', required: false })
  @IsString()
  @IsOptional()
  paisOrigen?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
