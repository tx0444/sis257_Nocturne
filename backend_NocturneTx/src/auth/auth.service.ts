import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ROLE_USUARIO } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    private jwtService: JwtService,
  ) {}

  private normalizeRol(nombre?: string): string {
    return (nombre ?? ROLE_USUARIO).toLowerCase();
  }

  async validateUser(emailOrNick: string, password: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: [{ email: emailOrNick }, { nickname: emailOrNick }],
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
    const rolNombre = this.normalizeRol(usuario.rol?.nombre);

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: rolNombre,
    };

    usuario.ultimoLogin = new Date();
    await this.usuarioRepository.save(usuario);

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: rolNombre,
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

    if (registerDto.nickname) {
      const existingNick = await this.usuarioRepository.findOne({
        where: { nickname: registerDto.nickname },
      });
      if (existingNick) {
        throw new UnauthorizedException('El nickname ya está en uso');
      }
    }

    let rolId = registerDto.rolId;
    if (rolId) {
      const rol = await this.rolRepository.findOne({ where: { id: rolId } });
      if (!rol) {
        throw new BadRequestException(`Rol con ID ${rolId} no existe`);
      }
    } else {
      const rolUsuario = await this.rolRepository.findOne({
        where: { nombre: ROLE_USUARIO },
      });
      if (!rolUsuario) {
        throw new BadRequestException(
          'No existe el rol "usuario". Reinicia el servidor para crear roles por defecto.',
        );
      }
      rolId = rolUsuario.id;
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const usuarioData: Partial<Usuario> = {
      nombre: registerDto.nombre,
      email: registerDto.email,
      password: hashedPassword,
      rolId,
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

    const savedUser = await this.usuarioRepository.save(
      this.usuarioRepository.create(usuarioData),
    );
    const usuario = await this.usuarioRepository.findOne({
      where: { id: savedUser.id },
      relations: ['rol'],
    });
    const rolNombre = this.normalizeRol(usuario?.rol?.nombre);

    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      rol: rolNombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: savedUser.id,
        nombre: savedUser.nombre,
        email: savedUser.email,
        rol: rolNombre,
      },
    };
  }

  async getProfile(userId: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['rol'],
    });
    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const { password: _password, ...perfil } = usuario;
    return {
      ...perfil,
      rol: usuario.rol
        ? { id: usuario.rol.id, nombre: usuario.rol.nombre }
        : { nombre: ROLE_USUARIO },
    };
  }
}
