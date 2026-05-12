import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
export declare class ProveedoresService {
    private readonly proveedorRepository;
    constructor(proveedorRepository: Repository<Proveedor>);
    create(createProveedoreDto: CreateProveedoreDto): Promise<Proveedor>;
    findAll(): Promise<Proveedor[]>;
    findOne(id: number): Promise<Proveedor>;
    findByNit(nit: string): Promise<Proveedor | null>;
    update(id: number, updateProveedoreDto: UpdateProveedoreDto): Promise<Proveedor>;
    remove(id: number): Promise<void>;
    buscar(termino: string): Promise<Proveedor[]>;
    getActivos(): Promise<Proveedor[]>;
}
