import { PromocionesService } from './promociones.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
export declare class PromocionesController {
    private readonly promocionesService;
    constructor(promocionesService: PromocionesService);
    create(createPromocionDto: CreatePromocionDto): Promise<import("./entities/promocion.entity").Promocion>;
    calcularDescuentos(items: {
        productoId: number;
        cantidad: number;
    }[]): Promise<{
        subtotalOriginalBs: number;
        descuentoTotalBs: number;
        totalFinalBs: number;
        detalles: any[];
    }>;
    findAll(): Promise<import("./entities/promocion.entity").Promocion[]>;
    findOne(id: string): Promise<import("./entities/promocion.entity").Promocion>;
    update(id: string, updatePromocionDto: UpdatePromocionDto): Promise<import("./entities/promocion.entity").Promocion>;
    remove(id: string): Promise<void>;
}
