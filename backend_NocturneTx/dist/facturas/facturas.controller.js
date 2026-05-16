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
exports.FacturasController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const facturas_service_1 = require("./facturas.service");
const create_factura_dto_1 = require("./dto/create-factura.dto");
const update_factura_dto_1 = require("./dto/update-factura.dto");
const factura_entity_1 = require("./entities/factura.entity");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
let FacturasController = class FacturasController {
    facturasService;
    constructor(facturasService) {
        this.facturasService = facturasService;
    }
    create(createFacturaDto, detalles, usuarioId) {
        return this.facturasService.create(createFacturaDto, detalles, parseInt(usuarioId, 10));
    }
    findAll() {
        return this.facturasService.findAll();
    }
    findByNumero(numero) {
        return this.facturasService.findByNumero(numero);
    }
    buscarPorFecha(inicio, fin) {
        return this.facturasService.buscarPorFecha(new Date(inicio), new Date(fin));
    }
    getEstadisticas(inicio, fin) {
        return this.facturasService.getEstadisticas(new Date(inicio), new Date(fin));
    }
    findOne(id) {
        return this.facturasService.findOne(id);
    }
    findDetalles(id) {
        return this.facturasService.findDetalles(id);
    }
    update(id, updateFacturaDto) {
        return this.facturasService.update(id, updateFacturaDto);
    }
    emitir(id) {
        return this.facturasService.emitir(id);
    }
    anular(id, motivo) {
        return this.facturasService.anular(id, motivo);
    }
    remove(id) {
        return this.facturasService.remove(id);
    }
};
exports.FacturasController = FacturasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva factura con detalles' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Factura creada', type: factura_entity_1.Factura }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('detalles')),
    __param(2, (0, common_1.Query)('usuarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_factura_dto_1.CreateFacturaDto, Array, String]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas las facturas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de facturas', type: [factura_entity_1.Factura] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('numero/:numero'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar factura por número' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Factura encontrada', type: factura_entity_1.Factura }),
    __param(0, (0, common_1.Param)('numero')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "findByNumero", null);
__decorate([
    (0, common_1.Get)('fecha'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar facturas por rango de fechas' }),
    (0, swagger_1.ApiQuery)({ name: 'inicio', required: true, description: 'Fecha inicio (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'fin', required: true, description: 'Fecha fin (YYYY-MM-DD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Facturas del período', type: [factura_entity_1.Factura] }),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "buscarPorFecha", null);
__decorate([
    (0, common_1.Get)('estadisticas'),
    (0, swagger_1.ApiOperation)({ summary: 'Estadísticas de facturación por período' }),
    (0, swagger_1.ApiQuery)({ name: 'inicio', required: true, description: 'Fecha inicio' }),
    (0, swagger_1.ApiQuery)({ name: 'fin', required: true, description: 'Fecha fin' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estadísticas' }),
    __param(0, (0, common_1.Query)('inicio')),
    __param(1, (0, common_1.Query)('fin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "getEstadisticas", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener factura por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Factura encontrada', type: factura_entity_1.Factura }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No encontrada' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/detalles'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalles de una factura' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles de la factura' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "findDetalles", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar factura (solo borrador)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Actualizada', type: factura_entity_1.Factura }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_factura_dto_1.UpdateFacturaDto]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/emitir'),
    (0, swagger_1.ApiOperation)({ summary: 'Emitir/validar factura' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Factura emitida', type: factura_entity_1.Factura }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "emitir", null);
__decorate([
    (0, common_1.Post)(':id/anular'),
    (0, swagger_1.ApiOperation)({ summary: 'Anular factura con motivo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Factura anulada', type: factura_entity_1.Factura }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('motivo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "anular", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar factura (solo borrador)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Eliminada' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FacturasController.prototype, "remove", null);
exports.FacturasController = FacturasController = __decorate([
    (0, swagger_1.ApiTags)('facturación'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN, constants_1.ROLE_VENDEDOR),
    (0, common_1.Controller)('facturas'),
    __metadata("design:paramtypes", [facturas_service_1.FacturasService])
], FacturasController);
//# sourceMappingURL=facturas.controller.js.map