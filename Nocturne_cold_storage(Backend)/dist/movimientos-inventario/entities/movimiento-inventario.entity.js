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
exports.MovimientoInventario = exports.TipoMovimiento = void 0;
const typeorm_1 = require("typeorm");
const inventario_entity_1 = require("../../inventarios/entities/inventario.entity");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var TipoMovimiento;
(function (TipoMovimiento) {
    TipoMovimiento["ENTRADA"] = "entrada";
    TipoMovimiento["SALIDA"] = "salida";
    TipoMovimiento["MERMA"] = "merma";
    TipoMovimiento["AJUSTE"] = "ajuste";
})(TipoMovimiento || (exports.TipoMovimiento = TipoMovimiento = {}));
let MovimientoInventario = class MovimientoInventario {
    id;
    tipo;
    cantidad;
    cantidadAntes;
    cantidadDespues;
    precioUnitario;
    motivo;
    numeroDocumento;
    observaciones;
    origenTipo;
    origenId;
    fechaMovimiento;
    createdAt;
    updatedAt;
    inventario;
    inventarioId;
    venta;
    ventaId;
    usuario;
    usuarioId;
};
exports.MovimientoInventario = MovimientoInventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoMovimiento }),
    __metadata("design:type", String)
], MovimientoInventario.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_antes', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "cantidadAntes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_despues', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "cantidadDespues", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], MovimientoInventario.prototype, "motivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_documento', length: 100, nullable: true }),
    __metadata("design:type", String)
], MovimientoInventario.prototype, "numeroDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MovimientoInventario.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origen_tipo', length: 50, nullable: true }),
    __metadata("design:type", String)
], MovimientoInventario.prototype, "origenTipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origen_id', nullable: true }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "origenId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_movimiento' }),
    __metadata("design:type", Date)
], MovimientoInventario.prototype, "fechaMovimiento", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MovimientoInventario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], MovimientoInventario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventario_entity_1.Inventario, (inventario) => inventario.movimientos),
    (0, typeorm_1.JoinColumn)({ name: 'inventario_id' }),
    __metadata("design:type", inventario_entity_1.Inventario)
], MovimientoInventario.prototype, "inventario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'inventario_id' }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "inventarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venta_entity_1.Venta, (venta) => venta.movimientos),
    (0, typeorm_1.JoinColumn)({ name: 'venta_id' }),
    __metadata("design:type", venta_entity_1.Venta)
], MovimientoInventario.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'venta_id', nullable: true }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], MovimientoInventario.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], MovimientoInventario.prototype, "usuarioId", void 0);
exports.MovimientoInventario = MovimientoInventario = __decorate([
    (0, typeorm_1.Entity)('movimientos_inventario')
], MovimientoInventario);
//# sourceMappingURL=movimiento-inventario.entity.js.map