import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
export declare class DireccionesController {
    private readonly direccionesService;
    constructor(direccionesService: DireccionesService);
    getAll(req: {
        user: {
            userId: number;
        };
    }): Promise<import("./entities/direccion.entity").Direccion[]>;
    create(req: {
        user: {
            userId: number;
        };
    }, dto: CreateDireccionDto): Promise<import("./entities/direccion.entity").Direccion>;
    update(req: {
        user: {
            userId: number;
        };
    }, id: string, dto: CreateDireccionDto): Promise<import("./entities/direccion.entity").Direccion>;
    delete(req: {
        user: {
            userId: number;
        };
    }, id: string): Promise<import("./entities/direccion.entity").Direccion>;
}
