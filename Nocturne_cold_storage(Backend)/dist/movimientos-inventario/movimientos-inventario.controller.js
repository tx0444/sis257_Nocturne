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
exports.MovimientosInventarioController = void 0;
const common_1 = require("@nestjs/common");
const movimientos_inventario_service_1 = require("./movimientos-inventario.service");
const create_movimiento_inventario_dto_1 = require("./dto/create-movimiento-inventario.dto");
const update_movimiento_inventario_dto_1 = require("./dto/update-movimiento-inventario.dto");
const movimiento_inventario_entity_1 = require("./entities/movimiento-inventario.entity");
let MovimientosInventarioController = class MovimientosInventarioController {
    movimientosService;
    constructor(movimientosService) {
        this.movimientosService = movimientosService;
    }
    create(createMovimientoDto) {
        return this.movimientosService.create(createMovimientoDto);
    }
    findAll() {
        return this.movimientosService.findAll();
    }
    getKardex(productoId) {
        return this.movimientosService.getKardex(productoId ? parseInt(productoId) : undefined);
    }
    findByInventario(inventarioId) {
        return this.movimientosService.findByInventario(inventarioId);
    }
    findByTipo(tipo) {
        return this.movimientosService.findByTipo(tipo);
    }
    findByDateRange(inicio, fin) {
        return this.movimientosService.findByDateRange(new Date(inicio), new Date(fin));
    }
    findOne(id) {
        return this.movimientosService.findOne(id);
    }
    update(id, updateMovimientoDto) {
        return this.movimientosService.update(id, updateMovimientoDto);
    }
    remove(id) {
        return this.movimientosService.remove(id);
    }
};
exports.MovimientosInventarioController = MovimientosInventarioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movimiento_inventario_dto_1.CreateMovimientoInventarioDto]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('kardex'),
    __param(0, (0, common_1.Query)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "getKardex", null);
__decorate([
    (0, common_1.Get)('inventario/:inventarioId'),
    __param(0, (0, common_1.Param)('inventarioId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "findByInventario", null);
__decorate([
    (0, common_1.Get)('tipo/:tipo'),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "findByTipo", null);
__decorate([
    (0, common_1.Get)('rango'),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_movimiento_inventario_dto_1.UpdateMovimientoInventarioDto]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovimientosInventarioController.prototype, "remove", null);
exports.MovimientosInventarioController = MovimientosInventarioController = __decorate([
    (0, common_1.Controller)('movimientos-inventario'),
    __metadata("design:paramtypes", [movimientos_inventario_service_1.MovimientosInventarioService])
], MovimientosInventarioController);
//# sourceMappingURL=movimientos-inventario.controller.js.map