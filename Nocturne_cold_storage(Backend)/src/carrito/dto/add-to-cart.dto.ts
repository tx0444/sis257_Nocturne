import { IsInt, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  productoId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  cantidad: number;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  cantidad: number;
}