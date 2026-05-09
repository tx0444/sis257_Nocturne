import { Repository } from 'typeorm';
import { Factura, TipoFactura } from './entities/factura.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { CreateFacturaDto, CreateDetalleFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
export declare class FacturasService {
    private readonly facturaRepository;
    private readonly detalleFacturaRepository;
    constructor(facturaRepository: Repository<Factura>, detalleFacturaRepository: Repository<DetalleFactura>);
    create(createFacturaDto: CreateFacturaDto, detalles: CreateDetalleFacturaDto[], usuarioId: number): Promise<Factura>;
    generarNumeroFactura(tipo: TipoFactura): Promise<string>;
    findAll(): Promise<Factura[]>;
    findOne(id: number): Promise<Factura>;
    findByNumero(numeroFactura: string): Promise<Factura>;
    findDetalles(facturaId: number): Promise<DetalleFactura[]>;
    update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura>;
    emitir(id: number): Promise<Factura>;
    anular(id: number, motivo: string): Promise<Factura>;
    remove(id: number): Promise<void>;
    buscarPorFecha(inicio: Date, fin: Date): Promise<Factura[]>;
    getEstadisticas(inicio: Date, fin: Date): Promise<any>;
}
