import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
export declare class CategoriasController {
    private readonly categoriasService;
    constructor(categoriasService: CategoriasService);
    create(createCategoriaDto: CreateCategoriaDto): Promise<import("./entities/categorias.entity").Categoria>;
    findAll(): Promise<import("./entities/categorias.entity").Categoria[]>;
    getConteoProductos(): Promise<any[]>;
    findByNombre(nombre: string): Promise<import("./entities/categorias.entity").Categoria | null>;
    findOne(id: number): Promise<import("./entities/categorias.entity").Categoria>;
    update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<import("./entities/categorias.entity").Categoria>;
    remove(id: number): Promise<void>;
}
