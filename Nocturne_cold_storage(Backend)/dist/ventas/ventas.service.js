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
exports.VentasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venta_entity_1 = require("./entities/venta.entity");
const detalle_venta_entity_1 = require("../detalles-venta/entities/detalle-venta.entity");
const movimientos_inventario_service_1 = require("../movimientos-inventario/movimientos-inventario.service");
const movimiento_inventario_entity_1 = require("../movimientos-inventario/entities/movimiento-inventario.entity");
const inventario_entity_1 = require("../inventarios/entities/inventario.entity");
let VentasService = class VentasService {
    ventaRepository;
    detalleRepository;
    inventarioRepository;
    movimientosService;
    constructor(ventaRepository, detalleRepository, inventarioRepository, movimientosService) {
        this.ventaRepository = ventaRepository;
        this.detalleRepository = detalleRepository;
        this.inventarioRepository = inventarioRepository;
        this.movimientosService = movimientosService;
    }
    async create(createVentaDto) {
        const { detalles, ...ventaData } = createVentaDto;
        const subtotal = detalles.reduce((sum, d) => sum + d.cantidad * d.precioUnitario - (d.descuento || 0), 0);
        const impuesto = subtotal * 0.13;
        const total = subtotal + impuesto - (ventaData.descuento || 0);
        const venta = this.ventaRepository.create({
            ...ventaData,
            tipoEntrega: ventaData.tipoEntrega || venta_entity_1.TipoEntrega.RECOJO,
            subtotal,
            impuesto,
            total,
            estado: venta_entity_1.EstadoVenta.PENDIENTE,
        });
        const savedVenta = await this.ventaRepository.save(venta);
        for (const detalleDto of detalles) {
            const detalle = this.detalleRepository.create({
                ...detalleDto,
                ventaId: savedVenta.id,
                subtotal: detalleDto.cantidad * detalleDto.precioUnitario - (detalleDto.descuento || 0),
            });
            await this.detalleRepository.save(detalle);
            if (detalleDto.inventarioId) {
                await this.movimientosService.create({
                    tipo: movimiento_inventario_entity_1.TipoMovimiento.SALIDA,
                    cantidad: detalleDto.cantidad,
                    inventarioId: detalleDto.inventarioId,
                    origenTipo: 'venta',
                    origenId: savedVenta.id,
                    ventaId: savedVenta.id,
                    usuarioId: ventaData.usuarioId || 1,
                    motivo: 'Venta',
                });
            }
        }
        return this.findOne(savedVenta.id);
    }
    async findAll() {
        return this.ventaRepository.find({
            relations: ['cliente', 'usuario', 'detalles', 'detalles.producto'],
            order: { fechaVenta: 'DESC' },
        });
    }
    async findOne(id) {
        const venta = await this.ventaRepository.findOne({
            where: { id },
            relations: ['cliente', 'usuario', 'detalles', 'detalles.producto', 'detalles.inventario'],
        });
        if (!venta) {
            throw new common_1.NotFoundException(`Venta con ID ${id} no encontrada`);
        }
        return venta;
    }
    async findByDateRange(inicio, fin) {
        return this.ventaRepository
            .createQueryBuilder('venta')
            .leftJoinAndSelect('venta.cliente', 'cliente')
            .leftJoinAndSelect('venta.usuario', 'usuario')
            .leftJoinAndSelect('venta.detalles', 'detalles')
            .where('venta.fechaVenta BETWEEN :inicio AND :fin', { inicio, fin })
            .orderBy('venta.fechaVenta', 'DESC')
            .getMany();
    }
    async update(id, updateVentaDto) {
        const venta = await this.findOne(id);
        Object.assign(venta, updateVentaDto);
        return this.ventaRepository.save(venta);
    }
    async cancel(id) {
        const venta = await this.findOne(id);
        venta.estado = venta_entity_1.EstadoVenta.CANCELADA;
        return this.ventaRepository.save(venta);
    }
    async remove(id) {
        const venta = await this.findOne(id);
        await this.ventaRepository.remove(venta);
    }
    async getEstadisticas(inicio, fin) {
        const ventas = await this.findByDateRange(inicio, fin);
        const porMetodo = ventas.reduce((acc, v) => {
            acc[v.metodoPago] = (acc[v.metodoPago] || 0) + 1;
            return acc;
        }, {});
        const totalVentas = ventas.length;
        const montoTotal = ventas.reduce((sum, v) => sum + Number(v.total), 0);
        return {
            totalVentas,
            montoTotal,
            promedioVenta: totalVentas > 0 ? montoTotal / totalVentas : 0,
            porMetodo,
            ventas,
        };
    }
};
exports.VentasService = VentasService;
exports.VentasService = VentasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(venta_entity_1.Venta)),
    __param(1, (0, typeorm_1.InjectRepository)(detalle_venta_entity_1.DetalleVenta)),
    __param(2, (0, typeorm_1.InjectRepository)(inventario_entity_1.Inventario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        movimientos_inventario_service_1.MovimientosInventarioService])
], VentasService);
//# sourceMappingURL=ventas.service.js.map