import { Repository } from 'typeorm';
import { Categoria } from './entities/categorias.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasService {
    private readonly categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria>;
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    findByNombre(nombre: string): Promise<Categoria | null>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>;
    remove(id: number): Promise<void>;
    getConteoProductos(): Promise<any[]>;
}
