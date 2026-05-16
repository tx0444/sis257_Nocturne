import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
export declare class ProductosService {
    private readonly productoRepository;
    constructor(productoRepository: Repository<Producto>);
    create(createProductoDto: CreateProductoDto): Promise<Producto>;
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    findByCodigoBarras(codigo: string): Promise<Producto | null>;
    findByCategoria(categoriaId: number): Promise<Producto[]>;
    update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto>;
    remove(id: number): Promise<void>;
    buscar(termino: string): Promise<Producto[]>;
    getActivos(): Promise<Producto[]>;
}
