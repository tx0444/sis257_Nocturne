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
exports.UpdateInventarioDto = exports.CreateInventarioDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInventarioDto {
    numeroLote;
    cantidad;
    fechaVencimiento;
    fechaEntrada;
    precioUnitario;
    estado;
    observaciones;
    productoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { numeroLote: { required: true, type: () => String }, cantidad: { required: true, type: () => Number }, fechaVencimiento: { required: false, type: () => String }, fechaEntrada: { required: false, type: () => String }, precioUnitario: { required: false, type: () => Number }, estado: { required: false, type: () => String }, observaciones: { required: false, type: () => String }, productoId: { required: true, type: () => Number } };
    }
}
exports.CreateInventarioDto = CreateInventarioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "numeroLote", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInventarioDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "fechaEntrada", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInventarioDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInventarioDto.prototype, "productoId", void 0);
class UpdateInventarioDto extends (0, swagger_1.PartialType)(CreateInventarioDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateInventarioDto = UpdateInventarioDto;
//# sourceMappingURL=create-inventario.dto.js.map