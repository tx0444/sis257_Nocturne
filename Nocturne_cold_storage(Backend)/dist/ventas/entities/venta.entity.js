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
exports.Venta = exports.TipoEntrega = exports.EstadoVenta = exports.MetodoPago = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const detalle_venta_entity_1 = require("../../detalles-venta/entities/detalle-venta.entity");
const movimiento_inventario_entity_1 = require("../../movimientos-inventario/entities/movimiento-inventario.entity");
var MetodoPago;
(function (MetodoPago) {
    MetodoPago["EFECTIVO"] = "efectivo";
    MetodoPago["TARJETA"] = "tarjeta";
    MetodoPago["QR"] = "qr";
    MetodoPago["MIXTO"] = "mixto";
})(MetodoPago || (exports.MetodoPago = MetodoPago = {}));
var EstadoVenta;
(function (EstadoVenta) {
    EstadoVenta["PENDIENTE"] = "pendiente";
    EstadoVenta["EN_CAMINO"] = "en_camino";
    EstadoVenta["COMPLETADA"] = "completada";
    EstadoVenta["CANCELADA"] = "cancelada";
    EstadoVenta["ANULADA"] = "anulada";
})(EstadoVenta || (exports.EstadoVenta = EstadoVenta = {}));
var TipoEntrega;
(function (TipoEntrega) {
    TipoEntrega["DOMICILIO"] = "domicilio";
    TipoEntrega["RECOJO"] = "recojo";
})(TipoEntrega || (exports.TipoEntrega = TipoEntrega = {}));
let Venta = class Venta {
    id;
    numeroFactura;
    subtotal;
    descuento;
    impuesto;
    total;
    montoEntregado;
    cambioDevuelto;
    metodoPago;
    estado;
    serie;
    numeroAutorizacion;
    observaciones;
    fechaVenta;
    createdAt;
    updatedAt;
    cliente;
    clienteId;
    usuario;
    usuarioId;
    detalles;
    movimientos;
    tipoEntrega;
    direccionEntrega;
    telefonoEntrega;
    referenciaEntrega;
};
exports.Venta = Venta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Venta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_factura', length: 50, unique: true }),
    __metadata("design:type", String)
], Venta.prototype, "numeroFactura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Venta.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Venta.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Venta.prototype, "impuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Venta.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_entregado', type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Venta.prototype, "montoEntregado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cambio_devuelto', type: 'decimal', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Venta.prototype, "cambioDevuelto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MetodoPago }),
    __metadata("design:type", String)
], Venta.prototype, "metodoPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoVenta, default: EstadoVenta.COMPLETADA }),
    __metadata("design:type", String)
], Venta.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'serie', length: 20, nullable: true }),
    __metadata("design:type", String)
], Venta.prototype, "serie", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_autorizacion', length: 100, nullable: true }),
    __metadata("design:type", String)
], Venta.prototype, "numeroAutorizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Venta.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_venta' }),
    __metadata("design:type", Date)
], Venta.prototype, "fechaVenta", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Venta.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Venta.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, (cliente) => cliente.ventas),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Venta.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id', nullable: true }),
    __metadata("design:type", Number)
], Venta.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Venta.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], Venta.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalle_venta_entity_1.DetalleVenta, (detalle) => detalle.venta),
    __metadata("design:type", Array)
], Venta.prototype, "detalles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movimiento_inventario_entity_1.MovimientoInventario, (movimiento) => movimiento.venta),
    __metadata("design:type", Array)
], Venta.prototype, "movimientos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_entrega', type: 'enum', enum: TipoEntrega, default: TipoEntrega.RECOJO }),
    __metadata("design:type", String)
], Venta.prototype, "tipoEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_entrega', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Venta.prototype, "direccionEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono_entrega', length: 20, nullable: true }),
    __metadata("design:type", String)
], Venta.prototype, "telefonoEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referencia_entrega', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Venta.prototype, "referenciaEntrega", void 0);
exports.Venta = Venta = __decorate([
    (0, typeorm_1.Entity)('ventas')
], Venta);
//# sourceMappingURL=venta.entity.js.map