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
exports.UpdateProductoDto = exports.CreateProductoDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductoDto {
    nombre;
    descripcion;
    gradoAlcoholico;
    requiereFrio;
    precioCompra;
    precioVenta;
    unidad;
    codigoBarras;
    imagenUrl;
    categoriaId;
    proveedorId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, gradoAlcoholico: { required: false, type: () => Number }, requiereFrio: { required: false, type: () => Boolean }, precioCompra: { required: false, type: () => Number }, precioVenta: { required: true, type: () => Number }, unidad: { required: false, type: () => String }, codigoBarras: { required: false, type: () => String }, imagenUrl: { required: false, type: () => String }, categoriaId: { required: false, type: () => Number }, proveedorId: { required: false, type: () => Number } };
    }
}
exports.CreateProductoDto = CreateProductoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "gradoAlcoholico", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductoDto.prototype, "requiereFrio", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "precioCompra", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "precioVenta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "unidad", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "codigoBarras", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductoDto.prototype, "imagenUrl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "categoriaId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateProductoDto.prototype, "proveedorId", void 0);
class UpdateProductoDto extends (0, swagger_1.PartialType)(CreateProductoDto) {
    activo;
    static _OPENAPI_METADATA_FACTORY() {
        return { activo: { required: false, type: () => Boolean } };
    }
}
exports.UpdateProductoDto = UpdateProductoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProductoDto.prototype, "activo", void 0);
//# sourceMappingURL=create-producto.dto.js.map