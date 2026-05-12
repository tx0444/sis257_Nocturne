import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrNick: string, password: string): Promise<Usuario> {
    // Try to find by email or nickname
    const usuario = await this.usuarioRepository.findOne({
      where: [
        { email: emailOrNick },
        { nickname: emailOrNick },
      ],
      relations: ['rol'],
    });

    if (!usuario || !usuario.activo) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return usuario;
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.validateUser(loginDto.emailOrNick, loginDto.password);

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol?.nombre || 'usuario',
    };

    // Update last login
    usuario.ultimoLogin = new Date();
    await this.usuarioRepository.save(usuario);

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol?.nombre || 'usuario',
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usuarioRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    // Check nickname uniqueness if provided
    if (registerDto.nickname) {
      const existingNick = await this.usuarioRepository.findOne({
        where: { nickname: registerDto.nickname },
      });
      if (existingNick) {
        throw new UnauthorizedException('El nickname ya está en uso');
      }
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const usuarioData: Partial<Usuario> = {
      nombre: registerDto.nombre,
      email: registerDto.email,
      password: hashedPassword,
      rolId: registerDto.rolId || 2,
    };

    if (registerDto.nickname) {
      usuarioData.nickname = registerDto.nickname;
    }
    if (registerDto.telefono) {
      usuarioData.telefono = registerDto.telefono;
    }
    if (registerDto.direccion) {
      usuarioData.direccion = registerDto.direccion;
    }

    const savedUser = await this.usuarioRepository.save(this.usuarioRepository.create(usuarioData));

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      rol: 'usuario',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: savedUser.id,
        nombre: savedUser.nombre,
        email: savedUser.email,
        rol: 'usuario',
      },
    };
  }

  async getProfile(userId: number) {
    return this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['rol'],
      select: ['id', 'nombre', 'nickname', 'email', 'telefono', 'direccion', 'fotoUrl', 'ultimoLogin', 'activo', 'createdAt'],
    });
  }
}