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
exports.CreateBitacoraDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const bitacora_entity_1 = require("../entities/bitacora.entity");
class CreateBitacoraDto {
    accion;
    nombreTabla;
    idRegistro;
    datosAnteriores;
    datosNuevos;
    descripcion;
    usuarioId;
    static _OPENAPI_METADATA_FACTORY() {
        return { accion: { required: true, enum: require("../entities/bitacora.entity").AccionBitacora }, nombreTabla: { required: true, type: () => String }, idRegistro: { required: false, type: () => Number }, datosAnteriores: { required: false, type: () => Object }, datosNuevos: { required: false, type: () => Object }, descripcion: { required: false, type: () => String }, usuarioId: { required: false, type: () => Number } };
    }
}
exports.CreateBitacoraDto = CreateBitacoraDto;
__decorate([
    (0, class_validator_1.IsEnum)(bitacora_entity_1.AccionBitacora),
    __metadata("design:type", String)
], CreateBitacoraDto.prototype, "accion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBitacoraDto.prototype, "nombreTabla", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBitacoraDto.prototype, "idRegistro", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateBitacoraDto.prototype, "datosAnteriores", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateBitacoraDto.prototype, "datosNuevos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBitacoraDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBitacoraDto.prototype, "usuarioId", void 0);
//# sourceMappingURL=create-bitacora.dto.js.map