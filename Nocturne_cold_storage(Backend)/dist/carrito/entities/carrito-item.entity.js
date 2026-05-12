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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoItem = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let CarritoItem = class CarritoItem {
    id;
    cantidad;
    precioUnitario;
    createdAt;
    updatedAt;
    usuario;
    usuarioId;
    producto;
    productoId;
};
exports.CarritoItem = CarritoItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarritoItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], CarritoItem.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CarritoItem.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CarritoItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CarritoItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], CarritoItem.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], CarritoItem.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], CarritoItem.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], CarritoItem.prototype, "productoId", void 0);
exports.CarritoItem = CarritoItem = __decorate([
    (0, typeorm_1.Entity)('carrito_items')
], CarritoItem);
//# sourceMappingURL=carrito-item.entity.js.map