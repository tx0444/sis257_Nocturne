import { MovimientosInventarioService } from './movimientos-inventario.service';
import { CreateMovimientoInventarioDto } from './dto/create-movimiento-inventario.dto';
import { UpdateMovimientoInventarioDto } from './dto/update-movimiento-inventario.dto';
import { TipoMovimiento } from './entities/movimiento-inventario.entity';
export declare class MovimientosInventarioController {
    private readonly movimientosService;
    constructor(movimientosService: MovimientosInventarioService);
    create(createMovimientoDto: CreateMovimientoInventarioDto): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario>;
    findAll(): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario[]>;
    getKardex(productoId?: string): Promise<any[]>;
    findByInventario(inventarioId: number): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario[]>;
    findByTipo(tipo: TipoMovimiento): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario[]>;
    findByDateRange(inicio: string, fin: string): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario[]>;
    findOne(id: number): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario>;
    update(id: number, updateMovimientoDto: UpdateMovimientoInventarioDto): Promise<import("./entities/movimiento-inventario.entity").MovimientoInventario>;
    remove(id: number): Promise<void>;
}
