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
exports.DetallesVentaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const detalle_venta_entity_1 = require("./entities/detalle-venta.entity");
let DetallesVentaService = class DetallesVentaService {
    detalleRepository;
    constructor(detalleRepository) {
        this.detalleRepository = detalleRepository;
    }
    async create(createDetallesVentaDto) {
        const detalle = this.detalleRepository.create(createDetallesVentaDto);
        return this.detalleRepository.save(detalle);
    }
    async findAll() {
        return this.detalleRepository.find({
            relations: ['venta', 'producto', 'inventario'],
            order: { id: 'DESC' },
        });
    }
    async findOne(id) {
        const detalle = await this.detalleRepository.findOne({
            where: { id },
            relations: ['venta', 'producto', 'inventario'],
        });
        if (!detalle) {
            throw new common_1.NotFoundException(`Detalle con ID ${id} no encontrado`);
        }
        return detalle;
    }
    async findByVenta(ventaId) {
        return this.detalleRepository.find({
            where: { ventaId },
            relations: ['producto', 'inventario'],
        });
    }
    async update(id, updateDetallesVentaDto) {
        const detalle = await this.findOne(id);
        Object.assign(detalle, updateDetallesVentaDto);
        return this.detalleRepository.save(detalle);
    }
    async remove(id) {
        const detalle = await this.findOne(id);
        await this.detalleRepository.remove(detalle);
    }
    async getProductosMasVendidos(limit = 10) {
        const result = await this.detalleRepository
            .createQueryBuilder('detalle')
            .select('detalle.productoId', 'productoId')
            .addSelect('SUM(detalle.cantidad)', 'totalVendido')
            .groupBy('detalle.productoId')
            .orderBy('totalVendido', 'DESC')
            .limit(limit)
            .getRawMany();
        return result;
    }
};
exports.DetallesVentaService = DetallesVentaService;
exports.DetallesVentaService = DetallesVentaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(detalle_venta_entity_1.DetalleVenta)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DetallesVentaService);
//# sourceMappingURL=detalles-venta.service.js.map