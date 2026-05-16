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
exports.Bitacora = exports.AccionBitacora = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
var AccionBitacora;
(function (AccionBitacora) {
    AccionBitacora["CREAR"] = "crear";
    AccionBitacora["ACTUALIZAR"] = "actualizar";
    AccionBitacora["ELIMINAR"] = "eliminar";
    AccionBitacora["LOGIN"] = "login";
    AccionBitacora["LOGOUT"] = "logout";
    AccionBitacora["EXPORTAR"] = "exportar";
    AccionBitacora["IMPORTAR"] = "importar";
})(AccionBitacora || (exports.AccionBitacora = AccionBitacora = {}));
let Bitacora = class Bitacora {
    id;
    accion;
    nombreTabla;
    idRegistro;
    datosAnteriores;
    datosNuevos;
    ip;
    userAgent;
    descripcion;
    fechaAccion;
    usuario;
    usuarioId;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, accion: { required: true, enum: require("./bitacora.entity").AccionBitacora }, nombreTabla: { required: true, type: () => String }, idRegistro: { required: true, type: () => Number }, datosAnteriores: { required: true, type: () => Object }, datosNuevos: { required: true, type: () => Object }, ip: { required: true, type: () => String }, userAgent: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, fechaAccion: { required: true, type: () => Date }, usuario: { required: true, type: () => require("../../usuarios/entities/usuario.entity").Usuario }, usuarioId: { required: true, type: () => Number } };
    }
};
exports.Bitacora = Bitacora;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bitacora.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AccionBitacora }),
    __metadata("design:type", String)
], Bitacora.prototype, "accion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_tabla', length: 100 }),
    __metadata("design:type", String)
], Bitacora.prototype, "nombreTabla", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_registro', nullable: true }),
    __metadata("design:type", Number)
], Bitacora.prototype, "idRegistro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Bitacora.prototype, "datosAnteriores", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Bitacora.prototype, "datosNuevos", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], Bitacora.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Bitacora.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Bitacora.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_accion' }),
    __metadata("design:type", Date)
], Bitacora.prototype, "fechaAccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Bitacora.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", Number)
], Bitacora.prototype, "usuarioId", void 0);
exports.Bitacora = Bitacora = __decorate([
    (0, typeorm_1.Entity)('bitacoras')
], Bitacora);
//# sourceMappingURL=bitacora.entity.js.map