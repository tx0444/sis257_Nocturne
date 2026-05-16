import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
export declare class DireccionesService {
    private direccionRepository;
    constructor(direccionRepository: Repository<Direccion>);
    getAll(usuarioId: number): Promise<Direccion[]>;
    create(usuarioId: number, dto: CreateDireccionDto): Promise<Direccion>;
    update(usuarioId: number, id: number, dto: CreateDireccionDto): Promise<Direccion>;
    delete(usuarioId: number, id: number): Promise<Direccion>;
}
