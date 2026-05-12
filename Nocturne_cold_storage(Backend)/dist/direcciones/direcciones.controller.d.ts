import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
export declare class DireccionesController {
    private readonly direccionesService;
    constructor(direccionesService: DireccionesService);
    getAll(req: any): Promise<import("./entities/direccion.entity").Direccion[]>;
    create(req: any, dto: CreateDireccionDto): Promise<import("./entities/direccion.entity").Direccion>;
    update(req: any, id: string, dto: CreateDireccionDto): Promise<import("./entities/direccion.entity").Direccion>;
    delete(req: any, id: string): Promise<import("./entities/direccion.entity").Direccion>;
}
