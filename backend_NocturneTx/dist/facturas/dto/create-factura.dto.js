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
exports.CreateDetalleFacturaDto = exports.CreateFacturaDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const factura_entity_1 = require("../entities/factura.entity");
class CreateFacturaDto {
    tipo;
    origen;
    prefijo;
    clienteId;
    ventaId;
    nombreCliente;
    nitCliente;
    direccionCliente;
    telefonoCliente;
    emailCliente;
    descuento;
    porcentajeImpuesto;
    observaciones;
    fechaVencimiento;
    facturaRelacionadaId;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo: { required: false, enum: require("../entities/factura.entity").TipoFactura }, origen: { required: false, enum: require("../entities/factura.entity").OrigenFactura }, prefijo: { required: false, type: () => String }, clienteId: { required: false, type: () => Number }, ventaId: { required: false, type: () => Number }, nombreCliente: { required: false, type: () => String }, nitCliente: { required: false, type: () => String }, direccionCliente: { required: false, type: () => String }, telefonoCliente: { required: false, type: () => String }, emailCliente: { required: false, type: () => String }, descuento: { required: false, type: () => Number }, porcentajeImpuesto: { required: false, type: () => Number }, observaciones: { required: false, type: () => String }, fechaVencimiento: { required: false, type: () => String }, facturaRelacionadaId: { required: false, type: () => Number } };
    }
}
exports.CreateFacturaDto = CreateFacturaDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: factura_entity_1.TipoFactura }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(factura_entity_1.TipoFactura),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: factura_entity_1.OrigenFactura }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(factura_entity_1.OrigenFactura),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "origen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'FAC' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "prefijo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "clienteId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "ventaId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Juan Pérez' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "nombreCliente", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '123456789' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "nitCliente", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "direccionCliente", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '70012345' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "telefonoCliente", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'cliente@email.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "emailCliente", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "descuento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 13 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "porcentajeImpuesto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "observaciones", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "fechaVencimiento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "facturaRelacionadaId", void 0);
class CreateDetalleFacturaDto {
    descripcion;
    referencia;
    cantidad;
    unidadMedida;
    precioUnitario;
    descuento;
    productoId;
    porcentajeImpuesto;
    static _OPENAPI_METADATA_FACTORY() {
        return { descripcion: { required: true, type: () => String }, referencia: { required: false, type: () => String }, cantidad: { required: true, type: () => Number }, unidadMedida: { required: false, type: () => String }, precioUnitario: { required: true, type: () => Number }, descuento: { required: false, type: () => Number }, productoId: { required: false, type: () => Number }, porcentajeImpuesto: { required: false, type: () => Number } };
    }
}
exports.CreateDetalleFacturaDto = CreateDetalleFacturaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Whisky 750ml' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDetalleFacturaDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDetalleFacturaDto.prototype, "referencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetalleFacturaDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'unidad' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDetalleFacturaDto.prototype, "unidadMedida", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetalleFacturaDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetalleFacturaDto.prototype, "descuento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetalleFacturaDto.prototype, "productoId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 13 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetalleFacturaDto.prototype, "porcentajeImpuesto", void 0);
//# sourceMappingURL=create-factura.dto.js.map