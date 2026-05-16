import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';
import { MetodoPago } from './entities/metodo-pago.entity';
export declare class MetodosPagoController {
    private readonly metodosPagoService;
    constructor(metodosPagoService: MetodosPagoService);
    create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago>;
    seed(): Promise<void>;
    findAll(): Promise<MetodoPago[]>;
    findAllAdmin(): Promise<MetodoPago[]>;
    findByTipo(tipo: string): Promise<MetodoPago>;
    calcularComision(id: number, monto: number): Promise<{
        comision: number;
        total: number;
    }>;
    findOne(id: number): Promise<MetodoPago>;
    update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago>;
    remove(id: number): Promise<void>;
    activar(id: number): Promise<MetodoPago>;
}
