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
exports.BitacorasController = void 0;
const common_1 = require("@nestjs/common");
const bitacoras_service_1 = require("./bitacoras.service");
const bitacora_entity_1 = require("./entities/bitacora.entity");
let BitacorasController = class BitacorasController {
    bitacorasService;
    constructor(bitacorasService) {
        this.bitacorasService = bitacorasService;
    }
    create(data) {
        return this.bitacorasService.create(data);
    }
    findAll() {
        return this.bitacorasService.findAll();
    }
    findByTable(tabla) {
        return this.bitacorasService.findByTable(tabla);
    }
    findByUser(usuarioId) {
        return this.bitacorasService.findByUser(usuarioId);
    }
    findByAccion(accion) {
        return this.bitacorasService.findByAccion(accion);
    }
    findByDateRange(inicio, fin) {
        return this.bitacorasService.findByDateRange(new Date(inicio), new Date(fin));
    }
    getReporte(inicio, fin) {
        return this.bitacorasService.getReporte(new Date(inicio), new Date(fin));
    }
};
exports.BitacorasController = BitacorasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tabla/:tabla'),
    __param(0, (0, common_1.Param)('tabla')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "findByTable", null);
__decorate([
    (0, common_1.Get)('usuario/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('accion/:accion'),
    __param(0, (0, common_1.Param)('accion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "findByAccion", null);
__decorate([
    (0, common_1.Get)('rango'),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)('reporte'),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BitacorasController.prototype, "getReporte", null);
exports.BitacorasController = BitacorasController = __decorate([
    (0, common_1.Controller)('bitacoras'),
    __metadata("design:paramtypes", [bitacoras_service_1.BitacorasService])
], BitacorasController);
//# sourceMappingURL=bitacoras.controller.js.map