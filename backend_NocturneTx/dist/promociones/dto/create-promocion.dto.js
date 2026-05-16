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
exports.CreatePromocionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const promocion_entity_1 = require("../entities/promocion.entity");
class CreatePromocionDto {
    nombre;
    descripcion;
    tipoDescuento;
    valorDescuento;
    fechaInicio;
    fechaFin;
    activa;
    categoriaId;
    productoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, tipoDescuento: { required: true, enum: require("../entities/promocion.entity").TipoDescuento }, valorDescuento: { required: true, type: () => Number }, fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, activa: { required: false, type: () => Boolean }, categoriaId: { required: false, type: () => Number }, productoId: { required: false, type: () => Number } };
    }
}
exports.CreatePromocionDto = CreatePromocionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromocionDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePromocionDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(promocion_entity_1.TipoDescuento),
    __metadata("design:type", String)
], CreatePromocionDto.prototype, "tipoDescuento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePromocionDto.prototype, "valorDescuento", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePromocionDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePromocionDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePromocionDto.prototype, "activa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePromocionDto.prototype, "categoriaId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePromocionDto.prototype, "productoId", void 0);
//# sourceMappingURL=create-promocion.dto.js.map