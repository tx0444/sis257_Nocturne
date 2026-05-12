import { Rol } from '../../roles/entities/rol.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import { MovimientoInventario } from '../../movimientos-inventario/entities/movimiento-inventario.entity';
import { Bitacora } from '../../bitacoras/entities/bitacora.entity';
export declare class Usuario {
    id: number;
    nombre: string;
    nickname: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    fotoUrl: string;
    ultimoLogin: Date;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    rol: Rol;
    rolId: number;
    ventas: Venta[];
    movimientos: MovimientoInventario[];
    bitacoras: Bitacora[];
}
