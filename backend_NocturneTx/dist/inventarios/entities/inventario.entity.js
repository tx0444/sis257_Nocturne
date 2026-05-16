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
exports.Inventario = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("../../productos/entities/producto.entity");
const movimiento_inventario_entity_1 = require("../../movimientos-inventario/entities/movimiento-inventario.entity");
let Inventario = class Inventario {
    id;
    numeroLote;
    cantidad;
    cantidadOriginal;
    fechaVencimiento;
    fechaEntrada;
    precioUnitario;
    estado;
    observaciones;
    createdAt;
    updatedAt;
    producto;
    productoId;
    movimientos;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, numeroLote: { required: true, type: () => String }, cantidad: { required: true, type: () => Number }, cantidadOriginal: { required: true, type: () => Number }, fechaVencimiento: { required: true, type: () => Date }, fechaEntrada: { required: true, type: () => Date }, precioUnitario: { required: true, type: () => Number }, estado: { required: true, type: () => String }, observaciones: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, producto: { required: true, type: () => require("../../productos/entities/producto.entity").Producto }, productoId: { required: true, type: () => Number }, movimientos: { required: true, type: () => [require("../../movimientos-inventario/entities/movimiento-inventario.entity").MovimientoInventario] } };
    }
};
exports.Inventario = Inventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_lote', length: 50 }),
    __metadata("design:type", String)
], Inventario.prototype, "numeroLote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_original', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidadOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_vencimiento', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Inventario.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_entrada', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Inventario.prototype, "fechaEntrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', default: 'disponible' }),
    __metadata("design:type", String)
], Inventario.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Inventario.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Inventario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Inventario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.inventarios),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], Inventario.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], Inventario.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movimiento_inventario_entity_1.MovimientoInventario, (movimiento) => movimiento.inventario),
    __metadata("design:type", Array)
], Inventario.prototype, "movimientos", void 0);
exports.Inventario = Inventario = __decorate([
    (0, typeorm_1.Entity)('inventarios')
], Inventario);
//# sourceMappingURL=inventario.entity.js.map