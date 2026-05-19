// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmpleadosService } from 'src/empleados/empleados.service';
import { ClientesService } from 'src/clientes/clientes.service';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private empleadosService: EmpleadosService,
    private clientesService: ClientesService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Pick<Empleado, 'id' | 'nombre' | 'email'> & { role: string };
  }> {
    const { email, password } = authLoginDto;
    const empleadoOk = await this.empleadosService.validate(email, password);

    if (!empleadoOk) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    const payload: JwtPayload = {
      sub: empleadoOk.id,
      role: 'empleado',
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: empleadoOk.id,
        nombre: empleadoOk.nombre,
        email: empleadoOk.email,
        role: 'empleado',
      },
    };
  }

  async loginClient(authLoginDto: AuthLoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Pick<Cliente, 'id' | 'nombre' | 'email'> & { role: string };
  }> {
    const { email, password } = authLoginDto;
    const cliente = await this.clientesService.findByEmail(email);

    if (!cliente || !(await cliente.validatePassword(password))) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    if (!cliente.activo) {
      throw new UnauthorizedException('La cuenta está desactivada');
    }

    const payload: JwtPayload = {
      sub: cliente.id,
      role: 'cliente',
    };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: cliente.id,
        nombre: cliente.nombre,
        email: cliente.email,
        role: 'cliente',
      },
    };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // Verificar el refresh token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );

      // Verificar que el usuario aún existe según su rol
      await this.verifyPayload(payload);

      // Generar nuevo access token
      const newPayload: JwtPayload = { sub: payload.sub, role: payload.role };
      const accessToken = await this.generateAccessToken(newPayload);

      return { accessToken };
    } catch (error: unknown) {
      throw new UnauthorizedException('Refresh token inválido o expirado', {
        cause: error,
      });
    }
  }

  private async generateAccessToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m', // 15 minutos
    });
  }

  private async generateRefreshToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // 7 días
    });
  }

  async verifyPayload(payload: JwtPayload): Promise<Empleado | Cliente> {
    if (payload.role === 'cliente') {
      try {
        const cliente = await this.clientesService.findOne(payload.sub);
        if (!cliente.activo) throw new UnauthorizedException('Cuenta desactivada');
        return cliente;
      } catch (error: unknown) {
        throw new UnauthorizedException(`Cliente inválido: ${payload.sub}`, { cause: error });
      }
    } else {
      try {
        const empleado = await this.empleadosService.findOne(payload.sub);
        if (!empleado.activo) throw new UnauthorizedException('Cuenta desactivada');
        return empleado;
      } catch (error: unknown) {
        throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`, { cause: error });
      }
    }
  }
}
