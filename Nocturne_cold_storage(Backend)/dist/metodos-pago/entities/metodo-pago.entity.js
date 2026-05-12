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
exports.MetodoPago = exports.EstadoMetodoPago = exports.TipoMetodo = void 0;
const typeorm_1 = require("typeorm");
var TipoMetodo;
(function (TipoMetodo) {
    TipoMetodo["EFECTIVO"] = "efectivo";
    TipoMetodo["TARJETA_DEBITO"] = "tarjeta_debito";
    TipoMetodo["TARJETA_CREDITO"] = "tarjeta_credito";
    TipoMetodo["TRANSFERENCIA"] = "transferencia";
    TipoMetodo["NEQUI"] = "nequi";
    TipoMetodo["DAVIPLATA"] = "daviplata";
    TipoMetodo["PAYPAL"] = "paypal";
    TipoMetodo["MERCADO_PAGO"] = "mercado_pago";
    TipoMetodo["QR"] = "qr";
    TipoMetodo["CONTRA_ENTREGA"] = "contra_entrega";
    TipoMetodo["MIXTO"] = "mixto";
})(TipoMetodo || (exports.TipoMetodo = TipoMetodo = {}));
var EstadoMetodoPago;
(function (EstadoMetodoPago) {
    EstadoMetodoPago["ACTIVO"] = "activo";
    EstadoMetodoPago["INACTIVO"] = "inactivo";
})(EstadoMetodoPago || (exports.EstadoMetodoPago = EstadoMetodoPago = {}));
let MetodoPago = class MetodoPago {
    id;
    nombre;
    tipo;
    descripcion;
    comisionPorcentaje;
    comisionFija;
    tiempoConfirmacion;
    requiereVerificacion;
    permiteParcial;
    activo;
    estado;
    createdAt;
    updatedAt;
};
exports.MetodoPago = MetodoPago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MetodoPago.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], MetodoPago.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoMetodo, unique: true }),
    __metadata("design:type", String)
], MetodoPago.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MetodoPago.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comision_porcentaje', type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetodoPago.prototype, "comisionPorcentaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comision_fija', type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetodoPago.prototype, "comisionFija", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tiempo_confirmacion', length: 50, nullable: true }),
    __metadata("design:type", String)
], MetodoPago.prototype, "tiempoConfirmacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], MetodoPago.prototype, "requiereVerificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], MetodoPago.prototype, "permiteParcial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MetodoPago.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoMetodoPago, default: EstadoMetodoPago.ACTIVO }),
    __metadata("design:type", String)
], MetodoPago.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MetodoPago.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], MetodoPago.prototype, "updatedAt", void 0);
exports.MetodoPago = MetodoPago = __decorate([
    (0, typeorm_1.Entity)('metodos_pago')
], MetodoPago);
//# sourceMappingURL=metodo-pago.entity.js.map