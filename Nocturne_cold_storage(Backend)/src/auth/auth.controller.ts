import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Public } from './decorators/auth-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Public()
  @Post('google')
  @HttpCode(HttpStatus.OK)
  async loginWithGoogle(@Body() body: { token?: string; credential?: string }) {
    const token = body.token || body.credential;
    if (!token) {
      throw new BadRequestException('Token o credential es requerido');
    }
    return this.authService.loginWithGoogle(token);
  }
}
