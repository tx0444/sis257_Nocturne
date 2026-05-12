import { Repository } from 'typeorm';
import { Bitacora, AccionBitacora } from './entities/bitacora.entity';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
export declare class BitacorasService {
    private readonly bitacoraRepository;
    constructor(bitacoraRepository: Repository<Bitacora>);
    create(createBitacoraDto: CreateBitacoraDto): Promise<Bitacora>;
    registrar(accion: AccionBitacora, tabla: string, registroId: number, datosAnteriores: any, datosNuevos: any, usuarioId: number, descripcion?: string): Promise<Bitacora>;
    findAll(): Promise<Bitacora[]>;
    findByTable(tabla: string): Promise<Bitacora[]>;
    findByUser(usuarioId: number): Promise<Bitacora[]>;
    findByDateRange(inicio: Date, fin: Date): Promise<Bitacora[]>;
    findByAccion(accion: AccionBitacora): Promise<Bitacora[]>;
    getReporte(inicio: Date, fin: Date): Promise<any>;
}
