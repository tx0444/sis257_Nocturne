import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usuarioRepository;
    private rolRepository;
    private jwtService;
    constructor(usuarioRepository: Repository<Usuario>, rolRepository: Repository<Rol>, jwtService: JwtService);
    private normalizeRol;
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
    getProfile(userId: number): Promise<{
        rol: {
            id: number;
            nombre: string;
        } | {
            nombre: string;
            id?: undefined;
        };
        id: number;
        nombre: string;
        nickname: string;
        email: string;
        telefono: string;
        direccion: string;
        fotoUrl: string;
        ultimoLogin: Date;
        activo: boolean;
        createdAt: Date;
        updatedAt: Date;
        rolId: number;
        ventas: import("../ventas/entities/venta.entity").Venta[];
        movimientos: import("../movimientos-inventario/entities/movimiento-inventario.entity").MovimientoInventario[];
        bitacoras: import("../bitacoras/entities/bitacora.entity").Bitacora[];
    }>;
}
