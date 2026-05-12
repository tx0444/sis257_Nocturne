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
exports.InventariosController = void 0;
const common_1 = require("@nestjs/common");
const inventarios_service_1 = require("./inventarios.service");
const create_inventario_dto_1 = require("./dto/create-inventario.dto");
const update_inventario_dto_1 = require("./dto/update-inventario.dto");
let InventariosController = class InventariosController {
    inventariosService;
    constructor(inventariosService) {
        this.inventariosService = inventariosService;
    }
    create(createInventarioDto) {
        return this.inventariosService.create(createInventarioDto);
    }
    findAll() {
        return this.inventariosService.findAll();
    }
    findByProducto(productoId) {
        return this.inventariosService.findByProducto(productoId);
    }
    findVencidos() {
        return this.inventariosService.findVencidos();
    }
    findPorVencer(dias) {
        return this.inventariosService.findPorVencer(dias ? parseInt(dias) : 30);
    }
    getStockTotal() {
        return this.inventariosService.getStockTotal();
    }
    findOne(id) {
        return this.inventariosService.findOne(id);
    }
    update(id, updateInventarioDto) {
        return this.inventariosService.update(id, updateInventarioDto);
    }
    remove(id) {
        return this.inventariosService.remove(id);
    }
};
exports.InventariosController = InventariosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventario_dto_1.CreateInventarioDto]),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('producto/:productoId'),
    __param(0, (0, common_1.Param)('productoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "findByProducto", null);
__decorate([
    (0, common_1.Get)('vencidos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "findVencidos", null);
__decorate([
    (0, common_1.Get)('por-vencer'),
    __param(0, (0, common_1.Query)('dias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "findPorVencer", null);
__decorate([
    (0, common_1.Get)('stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "getStockTotal", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_inventario_dto_1.UpdateInventarioDto]),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventariosController.prototype, "remove", null);
exports.InventariosController = InventariosController = __decorate([
    (0, common_1.Controller)('inventarios'),
    __metadata("design:paramtypes", [inventarios_service_1.InventariosService])
], InventariosController);
//# sourceMappingURL=inventarios.controller.js.map