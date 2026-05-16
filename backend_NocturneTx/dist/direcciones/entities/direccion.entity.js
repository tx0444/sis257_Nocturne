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
exports.Direccion = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
let Direccion = class Direccion {
    id;
    nombre;
    direccion;
    telefono;
    referencia;
    esDefault;
    activa;
    createdAt;
    updatedAt;
    usuario;
    usuarioId;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, nombre: { required: true, type: () => String }, direccion: { required: true, type: () => String }, telefono: { required: true, type: () => String }, referencia: { required: true, type: () => String }, esDefault: { required: true, type: () => Boolean }, activa: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, usuario: { required: true, type: () => require("../../usuarios/entities/usuario.entity").Usuario }, usuarioId: { required: true, type: () => Number } };
    }
};
exports.Direccion = Direccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Direccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Direccion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Direccion.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_default', default: false }),
    __metadata("design:type", Boolean)
], Direccion.prototype, "esDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Direccion.prototype, "activa", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Direccion.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Direccion.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Direccion.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], Direccion.prototype, "usuarioId", void 0);
exports.Direccion = Direccion = __decorate([
    (0, typeorm_1.Entity)('direcciones')
], Direccion);
//# sourceMappingURL=direccion.entity.js.map