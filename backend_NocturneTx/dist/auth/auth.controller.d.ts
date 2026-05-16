import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            nombre: string;
            email: string;
            rol: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            nombre: string;
            email: string;
            rol: string;
        };
    }>;
    getProfile(req: {
        user: {
            userId: number;
        };
    }): Promise<{
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
