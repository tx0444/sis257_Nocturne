import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { RegisterClienteDto } from './dto/register-cliente.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterClienteDto): Promise<any> {
    const usuario = await this.usuariosService.registerClient(registerDto);
    const payload: JwtPayload = { sub: usuario.id };
    const access_token = await this.getAccessToken(payload);
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      usuario: usuario.usuario,
      rol: { nombre: 'CLIENTE' },
      access_token,
    };
  }

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { usuario, clave } = authLoginDto;

    const usuarioOk = await this.usuariosService.validate(usuario, clave);

    const payload: JwtPayload = { sub: usuarioOk.id };
    const access_token = await this.getAccessToken(payload);

    return {
      id: usuarioOk.id,
      nombre: usuarioOk.nombre,
      apellido: usuarioOk.apellido,
      correo: usuarioOk.correo,
      usuario: usuarioOk.usuario,
      rol: usuarioOk.rol,
      access_token,
    };
  }

  async getAccessToken(payload: JwtPayload): Promise<string> {
    const secretKey = process.env.JWT_SECRET || 'default_secret';
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: '1d',
    });
  }

  async verifyPayload(payload: JwtPayload): Promise<Usuario> {
    let usuario: Usuario;
    try {
      usuario = await this.usuariosService.findOne(payload.sub);
    } catch {
      throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`);
    }
    return usuario;
  }
}
