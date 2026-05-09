import { FacturasService } from './facturas.service';
import { CreateFacturaDto, CreateDetalleFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from './entities/factura.entity';
export declare class FacturasController {
    private readonly facturasService;
    constructor(facturasService: FacturasService);
    create(createFacturaDto: CreateFacturaDto, detalles: CreateDetalleFacturaDto[], usuarioId: string): Promise<Factura>;
    findAll(): Promise<Factura[]>;
    findByNumero(numero: string): Promise<Factura>;
    buscarPorFecha(inicio: string, fin: string): Promise<Factura[]>;
    getEstadisticas(inicio: string, fin: string): Promise<any>;
    findOne(id: number): Promise<Factura>;
    findDetalles(id: number): Promise<import("./entities/detalle-factura.entity").DetalleFactura[]>;
    update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura>;
    emitir(id: number): Promise<Factura>;
    anular(id: number, motivo: string): Promise<Factura>;
    remove(id: number): Promise<void>;
}
