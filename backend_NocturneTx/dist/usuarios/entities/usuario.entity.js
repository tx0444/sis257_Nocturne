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
exports.Usuario = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("../../roles/entities/rol.entity");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
const movimiento_inventario_entity_1 = require("../../movimientos-inventario/entities/movimiento-inventario.entity");
const bitacora_entity_1 = require("../../bitacoras/entities/bitacora.entity");
let Usuario = class Usuario {
    id;
    nombre;
    nickname;
    email;
    password;
    telefono;
    direccion;
    fotoUrl;
    ultimoLogin;
    activo;
    createdAt;
    updatedAt;
    rol;
    rolId;
    ventas;
    movimientos;
    bitacoras;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, nombre: { required: true, type: () => String }, nickname: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, telefono: { required: true, type: () => String }, direccion: { required: true, type: () => String }, fotoUrl: { required: true, type: () => String }, ultimoLogin: { required: true, type: () => Date }, activo: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, rol: { required: true, type: () => require("../../roles/entities/rol.entity").Rol }, rolId: { required: true, type: () => Number }, ventas: { required: true, type: () => [require("../../ventas/entities/venta.entity").Venta] }, movimientos: { required: true, type: () => [require("../../movimientos-inventario/entities/movimiento-inventario.entity").MovimientoInventario] }, bitacoras: { required: true, type: () => [require("../../bitacoras/entities/bitacora.entity").Bitacora] } };
    }
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'foto_url', length: 500, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "fotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ultimo_login', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "ultimoLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.usuarios),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", rol_entity_1.Rol)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rol_id' }),
    __metadata("design:type", Number)
], Usuario.prototype, "rolId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => venta_entity_1.Venta, (venta) => venta.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "ventas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => movimiento_inventario_entity_1.MovimientoInventario, (movimiento) => movimiento.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "movimientos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bitacora_entity_1.Bitacora, (bitacora) => bitacora.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "bitacoras", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map