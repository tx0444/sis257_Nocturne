import { Usuario } from '../../usuarios/entities/usuario.entity';
export declare enum AccionBitacora {
    CREAR = "crear",
    ACTUALIZAR = "actualizar",
    ELIMINAR = "eliminar",
    LOGIN = "login",
    LOGOUT = "logout",
    EXPORTAR = "exportar",
    IMPORTAR = "importar"
}
export declare class Bitacora {
    id: number;
    accion: AccionBitacora;
    nombreTabla: string;
    idRegistro: number;
    datosAnteriores: any;
    datosNuevos: any;
    ip: string;
    userAgent: string;
    descripcion: string;
    fechaAccion: Date;
    usuario: Usuario;
    usuarioId: number;
}
