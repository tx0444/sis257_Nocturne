"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const factura_entity_1 = require("./entities/factura.entity");
const detalle_factura_entity_1 = require("./entities/detalle-factura.entity");
let FacturasService = class FacturasService {
    facturaRepository;
    detalleFacturaRepository;
    constructor(facturaRepository, detalleFacturaRepository) {
        this.facturaRepository = facturaRepository;
        this.detalleFacturaRepository = detalleFacturaRepository;
    }
    async create(createFacturaDto, detalles, usuarioId) {
        const numeroFactura = await this.generarNumeroFactura(createFacturaDto.tipo || factura_entity_1.TipoFactura.FACTURA);
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
            estado: factura_entity_1.EstadoFactura.BORRADOR,
            usuarioId,
        });
        const savedFactura = await this.facturaRepository.save(factura);
        for (const detalle of detallesCalculados) {
            const detalleFactura = this.detalleFacturaRepository.create({
                ...detalle,
                facturaId: savedFactura.id,
            });
            await this.detalleFacturaRepository.save(detalleFactura);
        }
        return this.findOne(savedFactura.id);
    }
    async generarNumeroFactura(tipo) {
        const prefijoMap = {
            [factura_entity_1.TipoFactura.FACTURA]: 'FV',
            [factura_entity_1.TipoFactura.NOTA_CREDITO]: 'NC',
            [factura_entity_1.TipoFactura.NOTA_DEBITO]: 'ND',
            [factura_entity_1.TipoFactura.TICKET]: 'TK',
            [factura_entity_1.TipoFactura.COTIZACION]: 'CQ',
        };
        const prefijo = prefijoMap[tipo] || 'FV';
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
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
    async findAll() {
        return this.facturaRepository.find({
            relations: ['cliente', 'usuario', 'venta'],
            order: { fechaEmision: 'DESC' },
        });
    }
    async findOne(id) {
        const factura = await this.facturaRepository.findOne({
            where: { id },
            relations: ['cliente', 'usuario', 'venta', 'facturaRelacionada'],
        });
        if (!factura) {
            throw new common_1.NotFoundException(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    }
    async findByNumero(numeroFactura) {
        const factura = await this.facturaRepository.findOne({
            where: { numeroFactura },
            relations: ['cliente', 'usuario', 'detallesFactura'],
        });
        if (!factura) {
            throw new common_1.NotFoundException(`Factura ${numeroFactura} no encontrada`);
        }
        return factura;
    }
    async findDetalles(facturaId) {
        return this.detalleFacturaRepository.find({
            where: { facturaId },
            relations: ['producto'],
        });
    }
    async update(id, updateFacturaDto) {
        const factura = await this.findOne(id);
        Object.assign(factura, updateFacturaDto);
        return this.facturaRepository.save(factura);
    }
    async emitir(id) {
        const factura = await this.findOne(id);
        if (factura.estado === factura_entity_1.EstadoFactura.ANULADA) {
            throw new Error('No se puede emitir una factura anulada');
        }
        factura.estado = factura_entity_1.EstadoFactura.EMITIDA;
        return this.facturaRepository.save(factura);
    }
    async anular(id, motivo) {
        const factura = await this.findOne(id);
        if (factura.estado === factura_entity_1.EstadoFactura.ANULADA) {
            throw new Error('La factura ya está anulada');
        }
        factura.estado = factura_entity_1.EstadoFactura.ANULADA;
        factura.motivoAnulacion = motivo;
        factura.fechaAnulacion = new Date();
        return this.facturaRepository.save(factura);
    }
    async remove(id) {
        const factura = await this.findOne(id);
        if (factura.estado !== factura_entity_1.EstadoFactura.BORRADOR) {
            throw new Error('Solo se pueden eliminar facturas en estado borrador');
        }
        await this.facturaRepository.remove(factura);
    }
    async buscarPorFecha(inicio, fin) {
        return this.facturaRepository
            .createQueryBuilder('factura')
            .leftJoinAndSelect('factura.cliente', 'cliente')
            .where('factura.fecha_emision BETWEEN :inicio AND :fin', { inicio, fin })
            .orderBy('factura.fecha_emision', 'DESC')
            .getMany();
    }
    async getEstadisticas(inicio, fin) {
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
};
exports.FacturasService = FacturasService;
exports.FacturasService = FacturasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(factura_entity_1.Factura)),
    __param(1, (0, typeorm_1.InjectRepository)(detalle_factura_entity_1.DetalleFactura)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FacturasService);
//# sourceMappingURL=facturas.service.js.map