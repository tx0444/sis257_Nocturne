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
exports.CarritoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const carrito_item_entity_1 = require("./entities/carrito-item.entity");
const producto_entity_1 = require("../productos/entities/producto.entity");
let CarritoService = class CarritoService {
    carritoRepository;
    productoRepository;
    constructor(carritoRepository, productoRepository) {
        this.carritoRepository = carritoRepository;
        this.productoRepository = productoRepository;
    }
    async getCarrito(usuarioId) {
        const items = await this.carritoRepository.find({
            where: { usuarioId },
            relations: ['producto'],
            order: { createdAt: 'DESC' },
        });
        const subtotal = items.reduce((sum, item) => {
            return sum + (item.precioUnitario * item.cantidad);
        }, 0);
        return {
            items,
            cantidad_items: items.length,
            subtotal,
        };
    }
    async addItem(usuarioId, dto) {
        const producto = await this.productoRepository.findOne({
            where: { id: dto.productoId, activo: true },
        });
        if (!producto) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        const existingItem = await this.carritoRepository.findOne({
            where: { usuarioId, productoId: dto.productoId },
        });
        if (existingItem) {
            existingItem.cantidad += dto.cantidad;
            return this.carritoRepository.save(existingItem);
        }
        const item = this.carritoRepository.create({
            usuarioId,
            productoId: dto.productoId,
            cantidad: dto.cantidad,
            precioUnitario: producto.precioVenta,
        });
        return this.carritoRepository.save(item);
    }
    async updateItem(usuarioId, productoId, dto) {
        const item = await this.carritoRepository.findOne({
            where: { usuarioId, productoId },
        });
        if (!item) {
            throw new common_1.NotFoundException('Item no encontrado en el carrito');
        }
        item.cantidad = dto.cantidad;
        return this.carritoRepository.save(item);
    }
    async removeItem(usuarioId, productoId) {
        const item = await this.carritoRepository.findOne({
            where: { usuarioId, productoId },
        });
        if (!item) {
            throw new common_1.NotFoundException('Item no encontrado en el carrito');
        }
        await this.carritoRepository.remove(item);
        return { message: 'Item eliminado del carrito' };
    }
    async clearCart(usuarioId) {
        await this.carritoRepository.delete({ usuarioId });
        return { message: 'Carrito vaciado' };
    }
};
exports.CarritoService = CarritoService;
exports.CarritoService = CarritoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carrito_item_entity_1.CarritoItem)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CarritoService);
//# sourceMappingURL=carrito.service.js.map