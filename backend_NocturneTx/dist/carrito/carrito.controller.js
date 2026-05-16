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
exports.CarritoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const carrito_service_1 = require("./carrito.service");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
let CarritoController = class CarritoController {
    carritoService;
    constructor(carritoService) {
        this.carritoService = carritoService;
    }
    getCarrito(req) {
        return this.carritoService.getCarrito(req.user.userId);
    }
    addItem(req, dto) {
        return this.carritoService.addItem(req.user.userId, dto);
    }
    updateItem(req, productoId, dto) {
        return this.carritoService.updateItem(req.user.userId, +productoId, dto);
    }
    removeItem(req, productoId) {
        return this.carritoService.removeItem(req.user.userId, +productoId);
    }
    clearCart(req) {
        return this.carritoService.clearCart(req.user.userId);
    }
};
exports.CarritoController = CarritoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener carrito del usuario' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "getCarrito", null);
__decorate([
    (0, common_1.Post)('agregar'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar producto al carrito' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/carrito-item.entity").CarritoItem }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)(':productoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar cantidad de un item' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/carrito-item.entity").CarritoItem }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('productoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, add_to_cart_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)(':productoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar item del carrito' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('productoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: 'Vaciar carrito' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "clearCart", null);
exports.CarritoController = CarritoController = __decorate([
    (0, swagger_1.ApiTags)('carrito'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('carrito'),
    __metadata("design:paramtypes", [carrito_service_1.CarritoService])
], CarritoController);
//# sourceMappingURL=carrito.controller.js.map