import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
export declare class InventariosService {
    private readonly inventarioRepository;
    constructor(inventarioRepository: Repository<Inventario>);
    create(createInventarioDto: CreateInventarioDto): Promise<Inventario>;
    findAll(): Promise<Inventario[]>;
    findOne(id: number): Promise<Inventario>;
    findByProducto(productoId: number): Promise<Inventario[]>;
    findVencidos(): Promise<Inventario[]>;
    findPorVencer(dias?: number): Promise<Inventario[]>;
    update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario>;
    remove(id: number): Promise<void>;
    actualizarCantidad(id: number, cantidad: number): Promise<Inventario>;
    getStockTotal(): Promise<any>;
}
