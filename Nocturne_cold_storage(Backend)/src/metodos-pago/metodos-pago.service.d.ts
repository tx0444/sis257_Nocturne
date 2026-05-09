import { Repository } from 'typeorm';
import { MetodoPago, TipoMetodo } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
export declare class MetodosPagoService {
    private readonly metodoPagoRepository;
    constructor(metodoPagoRepository: Repository<MetodoPago>);
    create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago>;
    seed(): Promise<void>;
    findAll(): Promise<MetodoPago[]>;
    findAllAdmin(): Promise<MetodoPago[]>;
    findOne(id: number): Promise<MetodoPago>;
    findByTipo(tipo: TipoMetodo): Promise<MetodoPago>;
    update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago>;
    remove(id: number): Promise<void>;
    activar(id: number): Promise<MetodoPago>;
    calcularComision(metodoId: number, monto: number): Promise<{
        comision: number;
        total: number;
    }>;
}
