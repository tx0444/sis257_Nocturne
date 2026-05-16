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
exports.UpdateProveedoreDto = exports.CreateProveedoreDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProveedoreDto {
    nombre;
    nit;
    direccion;
    telefono;
    email;
    personaContacto;
    observaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, nit: { required: false, type: () => String }, direccion: { required: false, type: () => String }, telefono: { required: false, type: () => String }, email: { required: false, type: () => String }, personaContacto: { required: false, type: () => String }, observaciones: { required: false, type: () => String } };
    }
}
exports.CreateProveedoreDto = CreateProveedoreDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "nit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "direccion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "personaContacto", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProveedoreDto.prototype, "observaciones", void 0);
class UpdateProveedoreDto extends (0, swagger_1.PartialType)(CreateProveedoreDto) {
    activo;
    static _OPENAPI_METADATA_FACTORY() {
        return { activo: { required: false, type: () => Boolean } };
    }
}
exports.UpdateProveedoreDto = UpdateProveedoreDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProveedoreDto.prototype, "activo", void 0);
//# sourceMappingURL=create-proveedore.dto.js.map