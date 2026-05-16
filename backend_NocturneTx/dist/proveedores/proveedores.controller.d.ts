import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
export declare class ProveedoresController {
    private readonly proveedoresService;
    constructor(proveedoresService: ProveedoresService);
    create(createProveedoreDto: CreateProveedoreDto): Promise<import("./entities/proveedor.entity").Proveedor>;
    findAll(): Promise<import("./entities/proveedor.entity").Proveedor[]>;
    getActivos(): Promise<import("./entities/proveedor.entity").Proveedor[]>;
    buscar(termino: string): Promise<import("./entities/proveedor.entity").Proveedor[]>;
    findByNit(nit: string): Promise<import("./entities/proveedor.entity").Proveedor | null>;
    findOne(id: number): Promise<import("./entities/proveedor.entity").Proveedor>;
    update(id: number, updateProveedoreDto: UpdateProveedoreDto): Promise<import("./entities/proveedor.entity").Proveedor>;
    remove(id: number): Promise<void>;
}
