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
exports.MetodosPagoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const metodo_pago_entity_1 = require("./entities/metodo-pago.entity");
let MetodosPagoService = class MetodosPagoService {
    metodoPagoRepository;
    constructor(metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }
    async create(createMetodoPagoDto) {
        const metodoPago = this.metodoPagoRepository.create(createMetodoPagoDto);
        return this.metodoPagoRepository.save(metodoPago);
    }
    async seed() {
        const metodosPorDefecto = [
            { nombre: 'Efectivo', tipo: metodo_pago_entity_1.TipoMetodo.EFECTIVO, descripcion: 'Pago en efectivo en punto de venta', comisionPorcentaje: 0, activo: true },
            { nombre: 'Tarjeta Débito', tipo: metodo_pago_entity_1.TipoMetodo.TARJETA_DEBITO, descripcion: 'Pago con tarjeta débito', comisionPorcentaje: 1.5, activo: true },
            { nombre: 'Tarjeta Crédito', tipo: metodo_pago_entity_1.TipoMetodo.TARJETA_CREDITO, descripcion: 'Pago con tarjeta crédito', comisionPorcentaje: 2.5, activo: true },
            { nombre: 'Transferencia Bancaria', tipo: metodo_pago_entity_1.TipoMetodo.TRANSFERENCIA, descripcion: 'Transferencia PSE o bancaria', comisionPorcentaje: 0, activo: true },
            { nombre: 'Nequi', tipo: metodo_pago_entity_1.TipoMetodo.NEQUI, descripcion: 'Pago móvil Nequi', comisionPorcentaje: 0, activo: true },
            { nombre: 'Daviplata', tipo: metodo_pago_entity_1.TipoMetodo.DAVIPLATA, descripcion: 'Pago móvil Daviplata', comisionPorcentaje: 0, activo: true },
            { nombre: 'PayPal', tipo: metodo_pago_entity_1.TipoMetodo.PAYPAL, descripcion: 'Pago con PayPal', comisionPorcentaje: 3.5, activo: true },
            { nombre: 'Mercado Pago', tipo: metodo_pago_entity_1.TipoMetodo.MERCADO_PAGO, descripcion: 'Pago con Mercado Pago', comisionPorcentaje: 4.5, activo: true },
            { nombre: 'QR', tipo: metodo_pago_entity_1.TipoMetodo.QR, descripcion: 'Pago con código QR', comisionPorcentaje: 1.0, activo: true },
            { nombre: 'Contra Entrega', tipo: metodo_pago_entity_1.TipoMetodo.CONTRA_ENTREGA, descripcion: 'Pago al recibir el producto', comisionPorcentaje: 0, activo: true },
            { nombre: 'Pago Mixto', tipo: metodo_pago_entity_1.TipoMetodo.MIXTO, descripcion: 'Combinación de varios métodos de pago', comisionPorcentaje: 0, activo: true },
        ];
        for (const metodo of metodosPorDefecto) {
            const existe = await this.metodoPagoRepository.findOne({ where: { tipo: metodo.tipo } });
            if (!existe) {
                const nuevo = this.metodoPagoRepository.create(metodo);
                await this.metodoPagoRepository.save(nuevo);
            }
        }
    }
    async findAll() {
        return this.metodoPagoRepository.find({
            where: { estado: metodo_pago_entity_1.EstadoMetodoPago.ACTIVO },
            order: { nombre: 'ASC' },
        });
    }
    async findAllAdmin() {
        return this.metodoPagoRepository.find({ order: { nombre: 'ASC' } });
    }
    async findOne(id) {
        const metodo = await this.metodoPagoRepository.findOne({ where: { id } });
        if (!metodo) {
            throw new common_1.NotFoundException(`Método de pago con ID ${id} no encontrado`);
        }
        return metodo;
    }
    async findByTipo(tipo) {
        const metodo = await this.metodoPagoRepository.findOne({ where: { tipo } });
        if (!metodo) {
            throw new common_1.NotFoundException(`Método de pago tipo ${tipo} no encontrado`);
        }
        return metodo;
    }
    async update(id, updateMetodoPagoDto) {
        const metodo = await this.findOne(id);
        Object.assign(metodo, updateMetodoPagoDto);
        return this.metodoPagoRepository.save(metodo);
    }
    async remove(id) {
        const metodo = await this.findOne(id);
        metodo.estado = metodo_pago_entity_1.EstadoMetodoPago.INACTIVO;
        await this.metodoPagoRepository.save(metodo);
    }
    async activar(id) {
        const metodo = await this.findOne(id);
        metodo.estado = metodo_pago_entity_1.EstadoMetodoPago.ACTIVO;
        metodo.activo = true;
        return this.metodoPagoRepository.save(metodo);
    }
    async calcularComision(metodoId, monto) {
        const metodo = await this.findOne(metodoId);
        const comision = (monto * Number(metodo.comisionPorcentaje)) / 100 + Number(metodo.comisionFija);
        return { comision, total: monto - comision };
    }
};
exports.MetodosPagoService = MetodosPagoService;
exports.MetodosPagoService = MetodosPagoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metodo_pago_entity_1.MetodoPago)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MetodosPagoService);
//# sourceMappingURL=metodos-pago.service.js.map