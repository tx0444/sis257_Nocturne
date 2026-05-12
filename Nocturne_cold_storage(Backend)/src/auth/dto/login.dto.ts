import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'juan@ejemplo.com o ElJuan123' })
  @IsString()
  emailOrNick: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;
}