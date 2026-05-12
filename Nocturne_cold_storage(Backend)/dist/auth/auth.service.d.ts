import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usuarioRepository;
    private jwtService;
    constructor(usuarioRepository: Repository<Usuario>, jwtService: JwtService);
    validateUser(emailOrNick: string, password: string): Promise<Usuario>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            nombre: string;
            email: string;
            rol: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            nombre: string;
            email: string;
            rol: string;
        };
    }>;
    getProfile(userId: number): Promise<Usuario | null>;
}
