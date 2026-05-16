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
exports.ProductosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const productos_service_1 = require("./productos.service");
const create_producto_dto_1 = require("./dto/create-producto.dto");
const update_producto_dto_1 = require("./dto/update-producto.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
let ProductosController = class ProductosController {
    productosService;
    constructor(productosService) {
        this.productosService = productosService;
    }
    create(createProductoDto) {
        return this.productosService.create(createProductoDto);
    }
    findAll() {
        return this.productosService.findAll();
    }
    getActivos() {
        return this.productosService.getActivos();
    }
    buscar(termino) {
        return this.productosService.buscar(termino);
    }
    findByCategoria(categoriaId) {
        return this.productosService.findByCategoria(categoriaId);
    }
    findByCodigoBarras(codigo) {
        return this.productosService.findByCodigoBarras(codigo);
    }
    findOne(id) {
        return this.productosService.findOne(id);
    }
    update(id, updateProductoDto) {
        return this.productosService.update(id, updateProductoDto);
    }
    remove(id) {
        return this.productosService.remove(id);
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear producto (admin)' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/producto.entity").Producto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_producto_dto_1.CreateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar productos (catálogo público)' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/producto.entity").Producto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('activos'),
    (0, swagger_1.ApiOperation)({ summary: 'Productos activos (catálogo público)' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/producto.entity").Producto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "getActivos", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('buscar'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar productos (catálogo público)' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/producto.entity").Producto] }),
    __param(0, (0, common_1.Query)('termino')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "buscar", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('categoria/:categoriaId'),
    (0, swagger_1.ApiOperation)({ summary: 'Productos por categoría (público)' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/producto.entity").Producto] }),
    __param(0, (0, common_1.Param)('categoriaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findByCategoria", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('codigo/:codigo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar por código de barras (público)' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findByCodigoBarras", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de producto (público)' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/producto.entity").Producto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar producto (admin)' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/producto.entity").Producto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_producto_dto_1.UpdateProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar producto (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "remove", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('productos'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map