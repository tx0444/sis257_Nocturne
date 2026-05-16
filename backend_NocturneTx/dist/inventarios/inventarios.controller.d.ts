import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
export declare class InventariosController {
    private readonly inventariosService;
    constructor(inventariosService: InventariosService);
    create(createInventarioDto: CreateInventarioDto): Promise<import("./entities/inventario.entity").Inventario>;
    findAll(): Promise<import("./entities/inventario.entity").Inventario[]>;
    findByProducto(productoId: number): Promise<import("./entities/inventario.entity").Inventario[]>;
    findVencidos(): Promise<import("./entities/inventario.entity").Inventario[]>;
    findPorVencer(dias?: string): Promise<import("./entities/inventario.entity").Inventario[]>;
    getStockTotal(): Promise<any>;
    findOne(id: number): Promise<import("./entities/inventario.entity").Inventario>;
    update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<import("./entities/inventario.entity").Inventario>;
    remove(id: number): Promise<void>;
}
