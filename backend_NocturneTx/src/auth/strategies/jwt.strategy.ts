import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ROLE_USUARIO } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'nocturne-secret-key-2024'),
    });
  }

  async validate(payload: { sub: number; email: string; rol?: string }) {
    return {
      userId: payload.sub,
      email: payload.email,
      rol: (payload.rol ?? ROLE_USUARIO).toLowerCase(),
    };
  }
}
