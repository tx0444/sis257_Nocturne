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
exports.PromocionesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const promociones_service_1 = require("./promociones.service");
const create_promocion_dto_1 = require("./dto/create-promocion.dto");
const update_promocion_dto_1 = require("./dto/update-promocion.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
let PromocionesController = class PromocionesController {
    promocionesService;
    constructor(promocionesService) {
        this.promocionesService = promocionesService;
    }
    create(createPromocionDto) {
        return this.promocionesService.create(createPromocionDto);
    }
    calcularDescuentos(items) {
        return this.promocionesService.calcularDescuentos(items);
    }
    findAll() {
        return this.promocionesService.findAll();
    }
    findOne(id) {
        return this.promocionesService.findOne(+id);
    }
    update(id, updatePromocionDto) {
        return this.promocionesService.update(+id, updatePromocionDto);
    }
    remove(id) {
        return this.promocionesService.remove(+id);
    }
};
exports.PromocionesController = PromocionesController;
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear promoción (admin)' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/promocion.entity").Promocion }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promocion_dto_1.CreatePromocionDto]),
    __metadata("design:returntype", void 0)
], PromocionesController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('calcular'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcular descuentos aplicables (público)' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PromocionesController.prototype, "calcularDescuentos", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar promociones activas (público)' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/promocion.entity").Promocion] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromocionesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de promoción (público)' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/promocion.entity").Promocion }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromocionesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar promoción (admin)' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/promocion.entity").Promocion }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_promocion_dto_1.UpdatePromocionDto]),
    __metadata("design:returntype", void 0)
], PromocionesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar promoción (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromocionesController.prototype, "remove", null);
exports.PromocionesController = PromocionesController = __decorate([
    (0, swagger_1.ApiTags)('promociones'),
    (0, common_1.Controller)('promociones'),
    __metadata("design:paramtypes", [promociones_service_1.PromocionesService])
], PromocionesController);
//# sourceMappingURL=promociones.controller.js.map