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
exports.DetallesVentaController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const detalles_venta_service_1 = require("./detalles-venta.service");
const create_detalles_venta_dto_1 = require("./dto/create-detalles-venta.dto");
const update_detalles_venta_dto_1 = require("./dto/update-detalles-venta.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
let DetallesVentaController = class DetallesVentaController {
    detallesVentaService;
    constructor(detallesVentaService) {
        this.detallesVentaService = detallesVentaService;
    }
    create(createDetallesVentaDto) {
        return this.detallesVentaService.create(createDetallesVentaDto);
    }
    findAll() {
        return this.detallesVentaService.findAll();
    }
    findByVenta(ventaId) {
        return this.detallesVentaService.findByVenta(ventaId);
    }
    getProductosMasVendidos(limit) {
        return this.detallesVentaService.getProductosMasVendidos(limit ? parseInt(limit) : 10);
    }
    findOne(id) {
        return this.detallesVentaService.findOne(id);
    }
    update(id, updateDetallesVentaDto) {
        return this.detallesVentaService.update(id, updateDetallesVentaDto);
    }
    remove(id) {
        return this.detallesVentaService.remove(id);
    }
};
exports.DetallesVentaController = DetallesVentaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear detalle de venta' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/detalle-venta.entity").DetalleVenta }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_detalles_venta_dto_1.CreateDetallesVentaDto]),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar detalles de venta' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/detalle-venta.entity").DetalleVenta] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('venta/:ventaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalles por venta' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/detalle-venta.entity").DetalleVenta] }),
    __param(0, (0, common_1.Param)('ventaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "findByVenta", null);
__decorate([
    openapi.ApiQuery({ name: "limit", required: false }),
    (0, common_1.Get)('mas-vendidos'),
    (0, swagger_1.ApiOperation)({ summary: 'Productos más vendidos' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "getProductosMasVendidos", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle por ID' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/detalle-venta.entity").DetalleVenta }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar detalle' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/detalle-venta.entity").DetalleVenta }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_detalles_venta_dto_1.UpdateDetallesVentaDto]),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar detalle (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DetallesVentaController.prototype, "remove", null);
exports.DetallesVentaController = DetallesVentaController = __decorate([
    (0, swagger_1.ApiTags)('detalles de venta'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN, constants_1.ROLE_VENDEDOR),
    (0, common_1.Controller)('detalles-venta'),
    __metadata("design:paramtypes", [detalles_venta_service_1.DetallesVentaService])
], DetallesVentaController);
//# sourceMappingURL=detalles-venta.controller.js.map