import { Repository } from 'typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { CreateDetallesVentaDto } from './dto/create-detalles-venta.dto';
import { UpdateDetallesVentaDto } from './dto/update-detalles-venta.dto';
export declare class DetallesVentaService {
    private readonly detalleRepository;
    constructor(detalleRepository: Repository<DetalleVenta>);
    create(createDetallesVentaDto: CreateDetallesVentaDto): Promise<DetalleVenta>;
    findAll(): Promise<DetalleVenta[]>;
    findOne(id: number): Promise<DetalleVenta>;
    findByVenta(ventaId: number): Promise<DetalleVenta[]>;
    update(id: number, updateDetallesVentaDto: UpdateDetallesVentaDto): Promise<DetalleVenta>;
    remove(id: number): Promise<void>;
    getProductosMasVendidos(limit?: number): Promise<any[]>;
}
