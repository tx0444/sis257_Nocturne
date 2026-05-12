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
exports.PromocionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promocion_entity_1 = require("./entities/promocion.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let PromocionesService = class PromocionesService {
    promocionRepository;
    productoRepository;
    constructor(promocionRepository, productoRepository) {
        this.promocionRepository = promocionRepository;
        this.productoRepository = productoRepository;
    }
    async create(createPromocionDto) {
        const nuevaPromocion = this.promocionRepository.create(createPromocionDto);
        return await this.promocionRepository.save(nuevaPromocion);
    }
    async findAll() {
        return await this.promocionRepository.find({
            relations: ['categoria', 'producto'],
        });
    }
    async findOne(id) {
        const promocion = await this.promocionRepository.findOne({
            where: { id },
            relations: ['categoria', 'producto'],
        });
        if (!promocion) {
            throw new common_1.NotFoundException(`Promoción con ID ${id} no encontrada`);
        }
        return promocion;
    }
    async update(id, updatePromocionDto) {
        const promocion = await this.findOne(id);
        const actual = Object.assign(promocion, updatePromocionDto);
        return await this.promocionRepository.save(actual);
    }
    async remove(id) {
        const promocion = await this.findOne(id);
        await this.promocionRepository.remove(promocion);
    }
    async calcularDescuentos(items) {
        const fechaActual = new Date();
        const promocionesActivas = await this.promocionRepository.find({
            where: {
                activa: true,
                fechaInicio: (0, typeorm_2.LessThanOrEqual)(fechaActual),
                fechaFin: (0, typeorm_2.MoreThanOrEqual)(fechaActual),
            },
        });
        let subtotalGeneral = 0;
        let descuentoTotalGeneral = 0;
        const detalles = [];
        for (const item of items) {
            const producto = await this.productoRepository.findOne({
                where: { id: item.productoId },
                relations: ['categoria'],
            });
            if (!producto)
                continue;
            const subtotalBase = Number(producto.precioVenta) * item.cantidad;
            let mejorDescuentoUnitario = 0;
            const promocionesAplicables = promocionesActivas.filter(p => p.productoId === producto.id || p.categoriaId === producto.categoriaId);
            for (const promo of promocionesAplicables) {
                let descuentoCalculado = 0;
                if (promo.tipoDescuento === promocion_entity_1.TipoDescuento.PORCENTAJE) {
                    descuentoCalculado = Number(producto.precioVenta) * (Number(promo.valorDescuento) / 100);
                }
                else if (promo.tipoDescuento === promocion_entity_1.TipoDescuento.MONTO_FIJO) {
                    descuentoCalculado = Number(promo.valorDescuento);
                }
                if (descuentoCalculado > mejorDescuentoUnitario) {
                    mejorDescuentoUnitario = descuentoCalculado;
                }
            }
            if (mejorDescuentoUnitario > Number(producto.precioVenta)) {
                mejorDescuentoUnitario = Number(producto.precioVenta);
            }
            const descuentoTotalProductoBs = mejorDescuentoUnitario * item.cantidad;
            const subtotalConDescuentoBs = subtotalBase - descuentoTotalProductoBs;
            subtotalGeneral += subtotalBase;
            descuentoTotalGeneral += descuentoTotalProductoBs;
            detalles.push({
                productoId: producto.id,
                nombre: producto.nombre,
                cantidad: item.cantidad,
                precioUnitarioBs: Number(producto.precioVenta),
                subtotalBaseBs: subtotalBase,
                descuentoAplicadoBs: descuentoTotalProductoBs,
                subtotalFinalBs: subtotalConDescuentoBs,
            });
        }
        return {
            subtotalOriginalBs: subtotalGeneral,
            descuentoTotalBs: descuentoTotalGeneral,
            totalFinalBs: subtotalGeneral - descuentoTotalGeneral,
            detalles,
        };
    }
};
exports.PromocionesService = PromocionesService;
exports.PromocionesService = PromocionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(promocion_entity_1.Promocion)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PromocionesService);
//# sourceMappingURL=promociones.service.js.map