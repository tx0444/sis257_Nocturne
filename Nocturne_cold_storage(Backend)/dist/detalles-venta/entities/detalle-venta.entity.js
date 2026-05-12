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
exports.DetalleVenta = exports.TemperaturaBebida = void 0;
const typeorm_1 = require("typeorm");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
const inventario_entity_1 = require("../../inventarios/entities/inventario.entity");
var TemperaturaBebida;
(function (TemperaturaBebida) {
    TemperaturaBebida["NATURAL"] = "natural";
    TemperaturaBebida["FRIA"] = "fria";
})(TemperaturaBebida || (exports.TemperaturaBebida = TemperaturaBebida = {}));
let DetalleVenta = class DetalleVenta {
    id;
    cantidad;
    precioUnitario;
    descuento;
    subtotal;
    numeroLote;
    temperaturaSeleccionada;
    observaciones;
    venta;
    ventaId;
    producto;
    productoId;
    inventario;
    inventarioId;
};
exports.DetalleVenta = DetalleVenta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_lote', length: 50, nullable: true }),
    __metadata("design:type", String)
], DetalleVenta.prototype, "numeroLote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TemperaturaBebida, default: TemperaturaBebida.NATURAL }),
    __metadata("design:type", String)
], DetalleVenta.prototype, "temperaturaSeleccionada", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], DetalleVenta.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venta_entity_1.Venta, (venta) => venta.detalles),
    (0, typeorm_1.JoinColumn)({ name: 'venta_id' }),
    __metadata("design:type", venta_entity_1.Venta)
], DetalleVenta.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'venta_id' }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.detallesVenta),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], DetalleVenta.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventario_entity_1.Inventario),
    (0, typeorm_1.JoinColumn)({ name: 'inventario_id' }),
    __metadata("design:type", inventario_entity_1.Inventario)
], DetalleVenta.prototype, "inventario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inventario_id' }),
    __metadata("design:type", Number)
], DetalleVenta.prototype, "inventarioId", void 0);
exports.DetalleVenta = DetalleVenta = __decorate([
    (0, typeorm_1.Entity)('detalles_venta')
], DetalleVenta);
//# sourceMappingURL=detalle-venta.entity.js.map