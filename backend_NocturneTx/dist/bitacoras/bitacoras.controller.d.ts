import { BitacorasService } from './bitacoras.service';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { AccionBitacora } from './entities/bitacora.entity';
export declare class BitacorasController {
    private readonly bitacorasService;
    constructor(bitacorasService: BitacorasService);
    create(data: CreateBitacoraDto): Promise<import("./entities/bitacora.entity").Bitacora>;
    findAll(): Promise<import("./entities/bitacora.entity").Bitacora[]>;
    findByTable(tabla: string): Promise<import("./entities/bitacora.entity").Bitacora[]>;
    findByUser(usuarioId: number): Promise<import("./entities/bitacora.entity").Bitacora[]>;
    findByAccion(accion: AccionBitacora): Promise<import("./entities/bitacora.entity").Bitacora[]>;
    findByDateRange(inicio: string, fin: string): Promise<import("./entities/bitacora.entity").Bitacora[]>;
    getReporte(inicio: string, fin: string): Promise<any>;
}
