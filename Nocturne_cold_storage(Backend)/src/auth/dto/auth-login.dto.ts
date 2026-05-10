import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
  @IsString({ message: 'El campo usuario debe ser cadena de caracteres' })
  usuario: string;

  @IsNotEmpty({ message: 'El campo clave no debe ser vacío' })
  @IsString({ message: 'El campo clave debe ser cadena de caracteres' })
  @MinLength(4, { message: 'El campo clave debe tener al menos 4 caracteres' })
  clave: string;
}
