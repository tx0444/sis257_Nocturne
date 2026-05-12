import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
export declare class VentasController {
    private readonly ventasService;
    constructor(ventasService: VentasService);
    create(createVentaDto: CreateVentaDto): Promise<import("./entities/venta.entity").Venta>;
    findAll(): Promise<import("./entities/venta.entity").Venta[]>;
    findByDateRange(inicio: string, fin: string): Promise<import("./entities/venta.entity").Venta[]>;
    getEstadisticas(inicio: string, fin: string): Promise<any>;
    findOne(id: number): Promise<import("./entities/venta.entity").Venta>;
    update(id: number, updateVentaDto: UpdateVentaDto): Promise<import("./entities/venta.entity").Venta>;
    cancel(id: number): Promise<import("./entities/venta.entity").Venta>;
    remove(id: number): Promise<void>;
}
