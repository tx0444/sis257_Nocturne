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
exports.Boveda = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let Boveda = class Boveda {
    id;
    cliente;
    clienteId;
    producto;
    productoId;
    numeroSerie;
    ubicacionFisica;
    estado;
    fechaAdquisicion;
    updatedAt;
};
exports.Boveda = Boveda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Boveda.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente),
    (0, typeorm_1.JoinColumn)({ name: 'cliente_id' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Boveda.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cliente_id' }),
    __metadata("design:type", Number)
], Boveda.prototype, "clienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], Boveda.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id' }),
    __metadata("design:type", Number)
], Boveda.prototype, "productoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero_serie', length: 50, unique: true }),
    __metadata("design:type", String)
], Boveda.prototype, "numeroSerie", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ubicacion_fisica', length: 100 }),
    __metadata("design:type", String)
], Boveda.prototype, "ubicacionFisica", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', length: 50, default: 'EN_BOVEDA' }),
    __metadata("design:type", String)
], Boveda.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_adquisicion' }),
    __metadata("design:type", Date)
], Boveda.prototype, "fechaAdquisicion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Boveda.prototype, "updatedAt", void 0);
exports.Boveda = Boveda = __decorate([
    (0, typeorm_1.Entity)('bovedas_custodia')
], Boveda);
//# sourceMappingURL=boveda.entity.js.map