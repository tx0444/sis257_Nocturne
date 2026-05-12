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
exports.UpdateVentaDto = exports.CreateVentaDto = exports.DetalleVentaItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const venta_entity_1 = require("../../ventas/entities/venta.entity");
class DetalleVentaItemDto {
    productoId;
    cantidad;
    precioUnitario;
    descuento;
    inventarioId;
}
exports.DetalleVentaItemDto = DetalleVentaItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetalleVentaItemDto.prototype, "productoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetalleVentaItemDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetalleVentaItemDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetalleVentaItemDto.prototype, "descuento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetalleVentaItemDto.prototype, "inventarioId", void 0);
class CreateVentaDto {
    tipoEntrega;
    direccionEntrega;
    telefonoEntrega;
    referenciaEntrega;
    metodoPago;
    clienteId;
    detalles;
    usuarioId;
    descuento;
}
exports.CreateVentaDto = CreateVentaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: venta_entity_1.TipoEntrega, example: 'domicilio' }),
    (0, class_validator_1.IsEnum)(venta_entity_1.TipoEntrega),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "tipoEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Av. 6 de Agosto #123, La Paz', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "direccionEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '70012345', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "telefonoEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cerca al parque', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "referenciaEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: venta_entity_1.MetodoPago, example: 'efectivo' }),
    (0, class_validator_1.IsEnum)(venta_entity_1.MetodoPago),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "metodoPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "clienteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DetalleVentaItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DetalleVentaItemDto),
    __metadata("design:type", Array)
], CreateVentaDto.prototype, "detalles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "usuarioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "descuento", void 0);
class UpdateVentaDto {
    estado;
    observaciones;
}
exports.UpdateVentaDto = UpdateVentaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: venta_entity_1.EstadoVenta, example: 'en_camino' }),
    (0, class_validator_1.IsEnum)(venta_entity_1.EstadoVenta),
    __metadata("design:type", String)
], UpdateVentaDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVentaDto.prototype, "observaciones", void 0);
//# sourceMappingURL=create-venta.dto.js.map