import { Repository } from 'typeorm';
import { Promocion } from './entities/promocion.entity';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { Producto } from '../productos/entities/producto.entity';
export declare class PromocionesService {
    private readonly promocionRepository;
    private readonly productoRepository;
    constructor(promocionRepository: Repository<Promocion>, productoRepository: Repository<Producto>);
    create(createPromocionDto: CreatePromocionDto): Promise<Promocion>;
    findAll(): Promise<Promocion[]>;
    findOne(id: number): Promise<Promocion>;
    update(id: number, updatePromocionDto: UpdatePromocionDto): Promise<Promocion>;
    remove(id: number): Promise<void>;
    calcularDescuentos(items: {
        productoId: number;
        cantidad: number;
    }[]): Promise<{
        subtotalOriginalBs: number;
        descuentoTotalBs: number;
        totalFinalBs: number;
        detalles: any[];
    }>;
}
