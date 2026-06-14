import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Cervezas' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Bebidas alcohólicas fermentadas', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=400', required: false })
  @IsString()
  @IsOptional()
  imagen?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
