import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalles-venta/entities/detalle-venta.entity';
import { CreateVentaDto, UpdateVentaDto } from './dto/create-venta.dto';
import { MovimientosInventarioService } from '../movimientos-inventario/movimientos-inventario.service';
import { Inventario } from '../inventarios/entities/inventario.entity';
export declare class VentasService {
    private readonly ventaRepository;
    private readonly detalleRepository;
    private readonly inventarioRepository;
    private readonly movimientosService;
    constructor(ventaRepository: Repository<Venta>, detalleRepository: Repository<DetalleVenta>, inventarioRepository: Repository<Inventario>, movimientosService: MovimientosInventarioService);
    create(createVentaDto: CreateVentaDto): Promise<Venta>;
    findAll(): Promise<Venta[]>;
    findOne(id: number): Promise<Venta>;
    findByDateRange(inicio: Date, fin: Date): Promise<Venta[]>;
    update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta>;
    cancel(id: number): Promise<Venta>;
    remove(id: number): Promise<void>;
    getEstadisticas(inicio: Date, fin: Date): Promise<any>;
}
