import { Repository } from 'typeorm';
import { MovimientoInventario, TipoMovimiento } from './entities/movimiento-inventario.entity';
import { CreateMovimientoInventarioDto } from './dto/create-movimiento-inventario.dto';
import { UpdateMovimientoInventarioDto } from './dto/update-movimiento-inventario.dto';
import { Inventario } from '../inventarios/entities/inventario.entity';
export declare class MovimientosInventarioService {
    private readonly movimientoRepository;
    private readonly inventarioRepository;
    constructor(movimientoRepository: Repository<MovimientoInventario>, inventarioRepository: Repository<Inventario>);
    create(createMovimientoDto: CreateMovimientoInventarioDto): Promise<MovimientoInventario>;
    findAll(): Promise<MovimientoInventario[]>;
    findOne(id: number): Promise<MovimientoInventario>;
    findByInventario(inventarioId: number): Promise<MovimientoInventario[]>;
    findByTipo(tipo: TipoMovimiento): Promise<MovimientoInventario[]>;
    findByDateRange(inicio: Date, fin: Date): Promise<MovimientoInventario[]>;
    update(id: number, updateMovimientoDto: UpdateMovimientoInventarioDto): Promise<MovimientoInventario>;
    remove(id: number): Promise<void>;
    getKardex(productoId?: number): Promise<any[]>;
}
