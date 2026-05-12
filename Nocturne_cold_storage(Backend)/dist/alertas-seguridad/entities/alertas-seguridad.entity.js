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
exports.AlertaSeguridad = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
let AlertaSeguridad = class AlertaSeguridad {
    id;
    cliente;
    clienteId;
    tipoAlerta;
    mensaje;
    leido;
    fechaAlerta;
};
exports.AlertaSeguridad = AlertaSeguridad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AlertaSeguridad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], AlertaSeguridad.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    __metadata("design:type", Number)
], AlertaSeguridad.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_alerta', length: 50 }),
    __metadata("design:type", String)
], AlertaSeguridad.prototype, "tipoAlerta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AlertaSeguridad.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], AlertaSeguridad.prototype, "leido", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_alerta' }),
    __metadata("design:type", Date)
], AlertaSeguridad.prototype, "fechaAlerta", void 0);
exports.AlertaSeguridad = AlertaSeguridad = __decorate([
    (0, typeorm_1.Entity)('alertas_seguridad')
], AlertaSeguridad);
//# sourceMappingURL=alertas-seguridad.entity.js.map