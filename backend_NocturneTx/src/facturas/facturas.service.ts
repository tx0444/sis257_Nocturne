import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura, TipoFactura, EstadoFactura } from './entities/factura.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { CreateFacturaDto, CreateDetalleFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(DetalleFactura)
    private readonly detalleFacturaRepository: Repository<DetalleFactura>,
  ) {}

  async create(createFacturaDto: CreateFacturaDto, detalles: CreateDetalleFacturaDto[], usuarioId: number): Promise<Factura> {
    const numeroFactura = await this.generarNumeroFactura(createFacturaDto.tipo || TipoFactura.FACTURA);

    // Calcular totales desde los detalles
    let subtotal = 0;
    let descuentoTotal = 0;
    let baseImpuesto = 0;
    let impuesto = 0;
    let total = 0;

    const detallesCalculados = detalles.map(d => {
      const sub = d.cantidad * d.precioUnitario - (d.descuento || 0);
      const porcImpuesto = d.porcentajeImpuesto || 19;
      const imp = sub * (porcImpuesto / 100);
      const tot = sub + imp;

      subtotal += d.cantidad * d.precioUnitario;
      descuentoTotal += d.descuento || 0;
      baseImpuesto += sub;
      impuesto += imp;
      total += tot;

      return {
        ...d,
        subtotal: sub,
        baseImpuesto: sub,
        porcentajeImpuesto: porcImpuesto,
        impuesto: imp,
        total: tot,
      };
    });

    const factura = this.facturaRepository.create({
      ...createFacturaDto,
      numeroFactura,
      prefijo: createFacturaDto.prefijo || 'FV',
      numeroConsecutivo: numeroFactura.split('-').pop(),
      subtotal,
      descuento: descuentoTotal,
      subtotalNeto: baseImpuesto,
      baseImpuesto,
      impuesto,
      total,
      estado: EstadoFactura.BORRADOR,
      usuarioId,
    });

    const savedFactura = await this.facturaRepository.save(factura);

    // Crear detalles
    for (const detalle of detallesCalculados) {
      const detalleFactura = this.detalleFacturaRepository.create({
        ...detalle,
        facturaId: savedFactura.id,
      });
      await this.detalleFacturaRepository.save(detalleFactura);
    }

    return this.findOne(savedFactura.id);
  }

  async generarNumeroFactura(tipo: TipoFactura): Promise<string> {
    const prefijoMap = {
      [TipoFactura.FACTURA]: 'FV',
      [TipoFactura.NOTA_CREDITO]: 'NC',
      [TipoFactura.NOTA_DEBITO]: 'ND',
      [TipoFactura.TICKET]: 'TK',
      [TipoFactura.COTIZACION]: 'CQ',
    };

    const prefijo = prefijoMap[tipo] || 'FV';
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');

    // Buscar el último número del mes
    const lastFactura = await this.facturaRepository
      .createQueryBuilder('factura')
      .where('factura.prefijo = :prefijo', { prefijo })
      .andWhere('factura.numero_consecutivo LIKE :pattern', { pattern: `${year}${month}%` })
      .orderBy('factura.numero_consecutivo', 'DESC')
      .getOne();

    let secuencial = 1;
    if (lastFactura) {
      const lastNum = parseInt(lastFactura.numeroConsecutivo.slice(-4), 10);
      secuencial = lastNum + 1;
    }

    return `${prefijo}-${year}${month}-${String(secuencial).padStart(4, '0')}`;
  }

  async findAll(): Promise<Factura[]> {
    return this.facturaRepository.find({
      relations: ['cliente', 'usuario', 'venta'],
      order: { fechaEmision: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: { id },
      relations: ['cliente', 'usuario', 'venta', 'facturaRelacionada'],
    });
    if (!factura) {
      throw new NotFoundException(`Factura con ID ${id} no encontrada`);
    }
    return factura;
  }

  async findByNumero(numeroFactura: string): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: { numeroFactura },
      relations: ['cliente', 'usuario', 'detallesFactura'],
    });
    if (!factura) {
      throw new NotFoundException(`Factura ${numeroFactura} no encontrada`);
    }
    return factura;
  }

  async findDetalles(facturaId: number): Promise<DetalleFactura[]> {
    return this.detalleFacturaRepository.find({
      where: { facturaId },
      relations: ['producto'],
    });
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto): Promise<Factura> {
    const factura = await this.findOne(id);
    Object.assign(factura, updateFacturaDto);
    return this.facturaRepository.save(factura);
  }

  async emitir(id: number): Promise<Factura> {
    const factura = await this.findOne(id);
    if (factura.estado === EstadoFactura.ANULADA) {
      throw new Error('No se puede emitir una factura anulada');
    }
    factura.estado = EstadoFactura.EMITIDA;
    return this.facturaRepository.save(factura);
  }

  async anular(id: number, motivo: string): Promise<Factura> {
    const factura = await this.findOne(id);
    if (factura.estado === EstadoFactura.ANULADA) {
      throw new Error('La factura ya está anulada');
    }
    factura.estado = EstadoFactura.ANULADA;
    factura.motivoAnulacion = motivo;
    factura.fechaAnulacion = new Date();
    return this.facturaRepository.save(factura);
  }

  async remove(id: number): Promise<void> {
    const factura = await this.findOne(id);
    if (factura.estado !== EstadoFactura.BORRADOR) {
      throw new Error('Solo se pueden eliminar facturas en estado borrador');
    }
    await this.facturaRepository.remove(factura);
  }

  async buscarPorFecha(inicio: Date, fin: Date): Promise<Factura[]> {
    return this.facturaRepository
      .createQueryBuilder('factura')
      .leftJoinAndSelect('factura.cliente', 'cliente')
      .where('factura.fecha_emision BETWEEN :inicio AND :fin', { inicio, fin })
      .orderBy('factura.fecha_emision', 'DESC')
      .getMany();
  }

  async getEstadisticas(inicio: Date, fin: Date): Promise<any> {
    const facturas = await this.buscarPorFecha(inicio, fin);

    const totalFacturas = facturas.length;
    const montoTotal = facturas.reduce((sum, f) => sum + Number(f.total), 0);
    const impuestosTotal = facturas.reduce((sum, f) => sum + Number(f.impuesto), 0);

    const porEstado = facturas.reduce((acc, f) => {
      acc[f.estado] = (acc[f.estado] || 0) + 1;
      return acc;
    }, {});

    const porTipo = facturas.reduce((acc, f) => {
      acc[f.tipo] = (acc[f.tipo] || 0) + 1;
      return acc;
    }, {});

    return {
      totalFacturas,
      montoTotal,
      impuestosTotal,
      promedioFactura: totalFacturas > 0 ? montoTotal / totalFacturas : 0,
      porEstado,
      porTipo,
    };
  }
}