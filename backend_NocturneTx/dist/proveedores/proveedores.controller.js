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
exports.ProveedoresController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const proveedores_service_1 = require("./proveedores.service");
const create_proveedore_dto_1 = require("./dto/create-proveedore.dto");
const update_proveedore_dto_1 = require("./dto/update-proveedore.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
let ProveedoresController = class ProveedoresController {
    proveedoresService;
    constructor(proveedoresService) {
        this.proveedoresService = proveedoresService;
    }
    create(createProveedoreDto) {
        return this.proveedoresService.create(createProveedoreDto);
    }
    findAll() {
        return this.proveedoresService.findAll();
    }
    getActivos() {
        return this.proveedoresService.getActivos();
    }
    buscar(termino) {
        return this.proveedoresService.buscar(termino);
    }
    findByNit(nit) {
        return this.proveedoresService.findByNit(nit);
    }
    findOne(id) {
        return this.proveedoresService.findOne(id);
    }
    update(id, updateProveedoreDto) {
        return this.proveedoresService.update(id, updateProveedoreDto);
    }
    remove(id) {
        return this.proveedoresService.remove(id);
    }
};
exports.ProveedoresController = ProveedoresController;
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear proveedor (admin)' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/proveedor.entity").Proveedor }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedore_dto_1.CreateProveedoreDto]),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar proveedores' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/proveedor.entity").Proveedor] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('activos'),
    (0, swagger_1.ApiOperation)({ summary: 'Proveedores activos' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/proveedor.entity").Proveedor] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "getActivos", null);
__decorate([
    (0, common_1.Get)('buscar'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar proveedores' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/proveedor.entity").Proveedor] }),
    __param(0, (0, common_1.Query)('termino')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "buscar", null);
__decorate([
    (0, common_1.Get)('nit/:nit'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar proveedor por NIT' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('nit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "findByNit", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener proveedor por ID' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/proveedor.entity").Proveedor }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar proveedor (admin)' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/proveedor.entity").Proveedor }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_proveedore_dto_1.UpdateProveedoreDto]),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar proveedor (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProveedoresController.prototype, "remove", null);
exports.ProveedoresController = ProveedoresController = __decorate([
    (0, swagger_1.ApiTags)('proveedores'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN, constants_1.ROLE_VENDEDOR),
    (0, common_1.Controller)('proveedores'),
    __metadata("design:paramtypes", [proveedores_service_1.ProveedoresService])
], ProveedoresController);
//# sourceMappingURL=proveedores.controller.js.map