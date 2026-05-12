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
exports.UpdateDetallesVentaDto = exports.CreateDetallesVentaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
class CreateDetallesVentaDto {
    cantidad;
    precioUnitario;
    descuento;
    ventaId;
    productoId;
    inventarioId;
    numeroLote;
    observaciones;
}
exports.CreateDetallesVentaDto = CreateDetallesVentaDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallesVentaDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallesVentaDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDetallesVentaDto.prototype, "descuento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallesVentaDto.prototype, "ventaId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallesVentaDto.prototype, "productoId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallesVentaDto.prototype, "inventarioId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDetallesVentaDto.prototype, "numeroLote", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDetallesVentaDto.prototype, "observaciones", void 0);
class UpdateDetallesVentaDto extends (0, mapped_types_1.PartialType)(CreateDetallesVentaDto) {
}
exports.UpdateDetallesVentaDto = UpdateDetallesVentaDto;
//# sourceMappingURL=create-detalles-venta.dto.js.map