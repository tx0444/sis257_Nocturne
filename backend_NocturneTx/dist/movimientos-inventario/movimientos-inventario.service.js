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
exports.MovimientosInventarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movimiento_inventario_entity_1 = require("./entities/movimiento-inventario.entity");
const inventario_entity_1 = require("../inventarios/entities/inventario.entity");
let MovimientosInventarioService = class MovimientosInventarioService {
    movimientoRepository;
    inventarioRepository;
    constructor(movimientoRepository, inventarioRepository) {
        this.movimientoRepository = movimientoRepository;
        this.inventarioRepository = inventarioRepository;
    }
    async create(createMovimientoDto) {
        const { cantidad, tipo, inventarioId } = createMovimientoDto;
        const inventario = await this.inventarioRepository.findOne({
            where: { id: inventarioId },
        });
        if (!inventario) {
            throw new common_1.NotFoundException(`Inventario con ID ${inventarioId} no encontrado`);
        }
        let cantidadAntes = inventario.cantidad;
        let cantidadDespues;
        switch (tipo) {
            case movimiento_inventario_entity_1.TipoMovimiento.ENTRADA:
                cantidadDespues = cantidadAntes + cantidad;
                break;
            case movimiento_inventario_entity_1.TipoMovimiento.SALIDA:
            case movimiento_inventario_entity_1.TipoMovimiento.MERMA:
                cantidadDespues = cantidadAntes - cantidad;
                if (cantidadDespues < 0) {
                    throw new Error('Stock insuficiente para el movimiento');
                }
                break;
            case movimiento_inventario_entity_1.TipoMovimiento.AJUSTE:
                cantidadDespues = cantidad;
                cantidadAntes = inventario.cantidadOriginal || cantidadAntes;
                break;
            default:
                cantidadDespues = cantidadAntes;
        }
        const movimiento = this.movimientoRepository.create({
            ...createMovimientoDto,
            cantidadAntes,
            cantidadDespues,
        });
        inventario.cantidad = cantidadDespues;
        await this.inventarioRepository.save(inventario);
        return this.movimientoRepository.save(movimiento);
    }
    async findAll() {
        return this.movimientoRepository.find({
            relations: ['inventario', 'inventario.producto', 'venta', 'usuario'],
            order: { fechaMovimiento: 'DESC' },
        });
    }
    async findOne(id) {
        const movimiento = await this.movimientoRepository.findOne({
            where: { id },
            relations: ['inventario', 'inventario.producto', 'venta', 'usuario'],
        });
        if (!movimiento) {
            throw new common_1.NotFoundException(`Movimiento con ID ${id} no encontrado`);
        }
        return movimiento;
    }
    async findByInventario(inventarioId) {
        return this.movimientoRepository.find({
            where: { inventarioId },
            relations: ['usuario'],
            order: { fechaMovimiento: 'DESC' },
        });
    }
    async findByTipo(tipo) {
        return this.movimientoRepository.find({
            where: { tipo },
            relations: ['inventario', 'inventario.producto', 'usuario'],
            order: { fechaMovimiento: 'DESC' },
        });
    }
    async findByDateRange(inicio, fin) {
        return this.movimientoRepository
            .createQueryBuilder('movimiento')
            .leftJoinAndSelect('movimiento.inventario', 'inventario')
            .leftJoinAndSelect('inventario.producto', 'producto')
            .leftJoinAndSelect('movimiento.usuario', 'usuario')
            .where('movimiento.fechaMovimiento BETWEEN :inicio AND :fin', { inicio, fin })
            .orderBy('movimiento.fechaMovimiento', 'DESC')
            .getMany();
    }
    async update(id, updateMovimientoDto) {
        const movimiento = await this.findOne(id);
        Object.assign(movimiento, updateMovimientoDto);
        return this.movimientoRepository.save(movimiento);
    }
    async remove(id) {
        const movimiento = await this.findOne(id);
        await this.movimientoRepository.remove(movimiento);
    }
    async getKardex(productoId) {
        const query = this.movimientoRepository
            .createQueryBuilder('movimiento')
            .leftJoinAndSelect('movimiento.inventario', 'inventario')
            .leftJoinAndSelect('inventario.producto', 'producto')
            .leftJoinAndSelect('movimiento.usuario', 'usuario');
        if (productoId) {
            query.where('inventario.productoId = :productoId', { productoId });
        }
        return query
            .orderBy('movimiento.fechaMovimiento', 'ASC')
            .getMany();
    }
};
exports.MovimientosInventarioService = MovimientosInventarioService;
exports.MovimientosInventarioService = MovimientosInventarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movimiento_inventario_entity_1.MovimientoInventario)),
    __param(1, (0, typeorm_1.InjectRepository)(inventario_entity_1.Inventario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MovimientosInventarioService);
//# sourceMappingURL=movimientos-inventario.service.js.map