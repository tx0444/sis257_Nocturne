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
exports.Factura = exports.OrigenFactura = exports.EstadoFactura = exports.TipoFactura = void 0;
const typeorm_1 = require("typeorm");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var TipoFactura;
(function (TipoFactura) {
    TipoFactura["FACTURA"] = "factura";
    TipoFactura["NOTA_CREDITO"] = "nota_credito";
    TipoFactura["NOTA_DEBITO"] = "nota_debito";
    TipoFactura["TICKET"] = "ticket";
    TipoFactura["COTIZACION"] = "cotizacion";
})(TipoFactura || (exports.TipoFactura = TipoFactura = {}));
var EstadoFactura;
(function (EstadoFactura) {
    EstadoFactura["BORRADOR"] = "borrador";
    EstadoFactura["EMITIDA"] = "emitida";
    EstadoFactura["ANULADA"] = "anulada";
    EstadoFactura["RECHAZADA"] = "rechazada";
    EstadoFactura["VALIDADA"] = "validada";
})(EstadoFactura || (exports.EstadoFactura = EstadoFactura = {}));
var OrigenFactura;
(function (OrigenFactura) {
    OrigenFactura["VENTA"] = "venta";
    OrigenFactura["DEVOLUCION"] = "devolucion";
    OrigenFactura["AJUSTE"] = "ajuste";
    OrigenFactura["COTIZACION"] = "cotizacion";
})(OrigenFactura || (exports.OrigenFactura = OrigenFactura = {}));
let Factura = class Factura {
    id;
    numeroFactura;
    prefijo;
    numeroConsecutivo;
    tipo;
    estado;
    origen;
    nombreCliente;
    nitCliente;
    direccionCliente;
    telefonoCliente;
    emailCliente;
    subtotal;
    descuento;
    subtotalNeto;
    baseImpuesto;
    impuesto;
    porcentajeImpuesto;
    total;
    cufe;
    fechaEmisionDian;
    qrCode;
    urlVerificacion;
    motivoAnulacion;
    fechaAnulacion;
    observaciones;
    terminosCondiciones;
    fechaVencimiento;
    fechaEmision;
    createdAt;
    updatedAt;
    venta;
    ventaId;
    cliente;
    clienteId;
    facturaRelacionada;
    facturaRelacionadaId;
    usuario;
    usuarioId;
};
exports.Factura = Factura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Factura.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_factura', length: 50, unique: true }),
    __metadata("design:type", String)
], Factura.prototype, "numeroFactura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prefijo', length: 10, nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "prefijo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_consecutivo', length: 20 }),
    __metadata("design:type", String)
], Factura.prototype, "numeroConsecutivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoFactura, default: TipoFactura.FACTURA }),
    __metadata("design:type", String)
], Factura.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoFactura, default: EstadoFactura.BORRADOR }),
    __metadata("design:type", String)
], Factura.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: OrigenFactura }),
    __metadata("design:type", String)
], Factura.prototype, "origen", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_cliente', length: 100 }),
    __metadata("design:type", String)
], Factura.prototype, "nombreCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nit_cliente', length: 20, nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "nitCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_cliente', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "direccionCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono_cliente', length: 20, nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "telefonoCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_cliente', length: 100, nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "emailCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Factura.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Factura.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Factura.prototype, "subtotalNeto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Factura.prototype, "baseImpuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Factura.prototype, "impuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 19 }),
    __metadata("design:type", Number)
], Factura.prototype, "porcentajeImpuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Factura.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cufe', length: 100, nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "cufe", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_emision_dian', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Factura.prototype, "fechaEmisionDian", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'qr_code', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "qrCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url_verificacion', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "urlVerificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'motivo_anulacion', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "motivoAnulacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_anulacion', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Factura.prototype, "fechaAnulacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'terminos_condiciones', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Factura.prototype, "terminosCondiciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_vencimiento', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Factura.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_emision' }),
    __metadata("design:type", Date)
], Factura.prototype, "fechaEmision", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Factura.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Factura.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venta_entity_1.Venta, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'venta_id' }),
    __metadata("design:type", venta_entity_1.Venta)
], Factura.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'venta_id', nullable: true }),
    __metadata("design:type", Number)
], Factura.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Factura.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id', nullable: true }),
    __metadata("design:type", Number)
], Factura.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Factura, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'factura_relacionada_id' }),
    __metadata("design:type", Factura)
], Factura.prototype, "facturaRelacionada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'factura_relacionada_id', nullable: true }),
    __metadata("design:type", Number)
], Factura.prototype, "facturaRelacionadaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Factura.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], Factura.prototype, "usuarioId", void 0);
exports.Factura = Factura = __decorate([
    (0, typeorm_1.Entity)('facturas')
], Factura);
//# sourceMappingURL=factura.entity.js.map