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
exports.Proveedor = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let Proveedor = class Proveedor {
    id;
    nombre;
    nit;
    direccion;
    telefono;
    email;
    personaContacto;
    observaciones;
    activo;
    createdAt;
    updatedAt;
    productos;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, nombre: { required: true, type: () => String }, nit: { required: true, type: () => String }, direccion: { required: true, type: () => String }, telefono: { required: true, type: () => String }, email: { required: true, type: () => String }, personaContacto: { required: true, type: () => String }, observaciones: { required: true, type: () => String }, activo: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, productos: { required: true, type: () => [require("../../productos/entities/producto.entity").Producto] } };
    }
};
exports.Proveedor = Proveedor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Proveedor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Proveedor.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "nit", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'persona_contacto', length: 100, nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "personaContacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Proveedor.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Proveedor.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Proveedor.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Proveedor.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => producto_entity_1.Producto, (producto) => producto.proveedor),
    __metadata("design:type", Array)
], Proveedor.prototype, "productos", void 0);
exports.Proveedor = Proveedor = __decorate([
    (0, typeorm_1.Entity)('proveedores')
], Proveedor);
//# sourceMappingURL=proveedor.entity.js.map