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
exports.Promocion = exports.TipoDescuento = void 0;
const typeorm_1 = require("typeorm");
const categorias_entity_1 = require("../../categorias/entities/categorias.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
var TipoDescuento;
(function (TipoDescuento) {
    TipoDescuento["PORCENTAJE"] = "PORCENTAJE";
    TipoDescuento["MONTO_FIJO"] = "MONTO_FIJO";
})(TipoDescuento || (exports.TipoDescuento = TipoDescuento = {}));
let Promocion = class Promocion {
    id;
    nombre;
    descripcion;
    tipoDescuento;
    valorDescuento;
    fechaInicio;
    fechaFin;
    activa;
    createdAt;
    updatedAt;
    categoria;
    categoriaId;
    producto;
    productoId;
};
exports.Promocion = Promocion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Promocion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Promocion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Promocion.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoDescuento, default: TipoDescuento.PORCENTAJE }),
    __metadata("design:type", String)
], Promocion.prototype, "tipoDescuento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Promocion.prototype, "valorDescuento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Promocion.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Promocion.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Promocion.prototype, "activa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Promocion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Promocion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorias_entity_1.Categoria, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categorias_entity_1.Categoria)
], Promocion.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria_id', nullable: true }),
    __metadata("design:type", Number)
], Promocion.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], Promocion.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id', nullable: true }),
    __metadata("design:type", Number)
], Promocion.prototype, "productoId", void 0);
exports.Promocion = Promocion = __decorate([
    (0, typeorm_1.Entity)('promociones')
], Promocion);
//# sourceMappingURL=promocion.entity.js.map