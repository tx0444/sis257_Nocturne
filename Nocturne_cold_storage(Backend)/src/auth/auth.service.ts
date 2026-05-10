import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  // Login tradicional compatible con demo_nest_jwt
  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { usuario, clave } = authLoginDto;
    
    // Validar usuario (usuario es mapeado a email en la BD de Nocturne)
    const usuarioOk = await this.usuariosService.validate(usuario, clave);

    const payload: JwtPayload = { sub: usuarioOk.id };
    const access_token = await this.getAccessToken(payload);

    return {
      id: usuarioOk.id,
      nombre: usuarioOk.nombre,
      email: usuarioOk.email,
      rol: usuarioOk.rol,
      fotoUrl: usuarioOk.fotoUrl,
      avatar: usuarioOk.avatar,
      google_provider: usuarioOk.googleProvider,
      access_token,
    };
  }

  // Generar access token
  async getAccessToken(payload: JwtPayload): Promise<string> {
    const secretKey = process.env.JWT_TOKEN || process.env.JWT_SECRET || 'default_secret';
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: '1d',
    });
  }

  // Verificar payload para JwtStrategy
  async verifyPayload(payload: JwtPayload): Promise<Usuario> {
    let usuario: Usuario;
    try {
      usuario = await this.usuariosService.findOne(payload.sub);
    } catch {
      throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`);
    }
    return usuario;
  }

  // Login de Google
  async loginWithGoogle(token: string) {
    let payload;
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (error) {
      throw new UnauthorizedException('Token de Google inválido');
    }

    if (!payload) {
      throw new UnauthorizedException('No se pudo verificar el token de Google');
    }

    const { email, name, picture, sub } = payload;

    if (!email) {
      throw new UnauthorizedException('El token de Google no contiene un correo electrónico');
    }

    let usuario = await this.usuariosService.findByEmail(email);

    if (!usuario) {
      let defaultRol = await this.rolRepository.findOne({ where: { nombre: 'Cliente' } });
      if (!defaultRol) {
        defaultRol = await this.rolRepository.findOne({ where: {} });
      }
      if (!defaultRol) {
        defaultRol = this.rolRepository.create({
          nombre: 'Cliente',
          descripcion: 'Rol de cliente por defecto',
          permisos: ['ver'],
          activo: true,
        });
        defaultRol = await this.rolRepository.save(defaultRol);
      }

      usuario = this.usuarioRepository.create({
        nombre: name || 'Google User',
        email,
        password: '', // Sin contraseña local
        googleProvider: true,
        googleId: sub,
        avatar: picture || '',
        fotoUrl: picture || '',
        rolId: defaultRol.id,
        activo: true,
      });
      usuario = await this.usuarioRepository.save(usuario);
    } else {
      usuario.googleProvider = true;
      usuario.googleId = sub;
      if (picture) {
        usuario.avatar = picture;
        usuario.fotoUrl = picture;
      }
      usuario = await this.usuarioRepository.save(usuario);
    }

    await this.usuariosService.updateLastLogin(usuario.id);

    const usuarioConRelaciones = await this.usuariosService.findOne(usuario.id);

    const jwtPayload: JwtPayload = { sub: usuarioConRelaciones.id };
    const accessToken = await this.getAccessToken(jwtPayload);

    return {
      access_token: accessToken,
      user: {
        id: usuarioConRelaciones.id,
        nombre: usuarioConRelaciones.nombre,
        email: usuarioConRelaciones.email,
        google_provider: usuarioConRelaciones.googleProvider,
        google_id: usuarioConRelaciones.googleId,
        avatar: usuarioConRelaciones.avatar,
        rol: usuarioConRelaciones.rol,
      },
    };
  }
}
