import { DetallesVentaService } from './detalles-venta.service';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';
export declare class DetallesVentaController {
    private readonly detallesVentaService;
    constructor(detallesVentaService: DetallesVentaService);
    create(createDetallesVentaDto: CreateDetallesVentaDto): Promise<import("./entities/detalle-venta.entity").DetalleVenta>;
    findAll(): Promise<import("./entities/detalle-venta.entity").DetalleVenta[]>;
    findByVenta(ventaId: number): Promise<import("./entities/detalle-venta.entity").DetalleVenta[]>;
    getProductosMasVendidos(limit?: string): Promise<any[]>;
    findOne(id: number): Promise<import("./entities/detalle-venta.entity").DetalleVenta>;
    update(id: number, updateDetallesVentaDto: UpdateDetallesVentaDto): Promise<import("./entities/detalle-venta.entity").DetalleVenta>;
    remove(id: number): Promise<void>;
}
