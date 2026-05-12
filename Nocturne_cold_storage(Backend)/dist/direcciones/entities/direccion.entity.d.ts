import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare class Direccion {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    referencia: string;
    esDefault: boolean;
    activa: boolean;
    createdAt: Date;
    updatedAt: Date;
    usuario: Usuario;
    usuarioId: number;
}
