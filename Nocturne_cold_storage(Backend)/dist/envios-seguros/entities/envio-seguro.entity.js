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
exports.EnvioSeguro = void 0;
const typeorm_1 = require("typeorm");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
let EnvioSeguro = class EnvioSeguro {
    id;
    venta;
    ventaId;
    agenteAsignado;
    latitudActual;
    longitudActual;
    temperaturaConvoy;
    humedadConvoy;
    progresoPorcentaje;
    estadoLogistico;
    fechaInicio;
    updatedAt;
};
exports.EnvioSeguro = EnvioSeguro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => venta_entity_1.Venta),
    (0, typeorm_1.JoinColumn)({ name: 'venta_id' }),
    __metadata("design:type", venta_entity_1.Venta)
], EnvioSeguro.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'venta_id' }),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "ventaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'agente_asignado', length: 100 }),
    __metadata("design:type", String)
], EnvioSeguro.prototype, "agenteAsignado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latitud_actual', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "latitudActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'longitud_actual', type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "longitudActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'temperatura_convoy', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "temperaturaConvoy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'humedad_convoy', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "humedadConvoy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'progreso_porcentaje', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], EnvioSeguro.prototype, "progresoPorcentaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_logistico', length: 50, default: 'FIRMA_NOTARIAL' }),
    __metadata("design:type", String)
], EnvioSeguro.prototype, "estadoLogistico", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_inicio' }),
    __metadata("design:type", Date)
], EnvioSeguro.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], EnvioSeguro.prototype, "updatedAt", void 0);
exports.EnvioSeguro = EnvioSeguro = __decorate([
    (0, typeorm_1.Entity)('envios_seguros')
], EnvioSeguro);
//# sourceMappingURL=envio-seguro.entity.js.map