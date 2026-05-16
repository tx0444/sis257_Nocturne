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
exports.DetalleFactura = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const factura_entity_1 = require("./factura.entity");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let DetalleFactura = class DetalleFactura {
    id;
    descripcion;
    referencia;
    cantidad;
    unidadMedida;
    precioUnitario;
    descuento;
    subtotal;
    baseImpuesto;
    porcentajeImpuesto;
    impuesto;
    total;
    createdAt;
    factura;
    facturaId;
    producto;
    productoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, descripcion: { required: true, type: () => String }, referencia: { required: true, type: () => String }, cantidad: { required: true, type: () => Number }, unidadMedida: { required: true, type: () => String }, precioUnitario: { required: true, type: () => Number }, descuento: { required: true, type: () => Number }, subtotal: { required: true, type: () => Number }, baseImpuesto: { required: true, type: () => Number }, porcentajeImpuesto: { required: true, type: () => Number }, impuesto: { required: true, type: () => Number }, total: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, factura: { required: true, type: () => require("./factura.entity").Factura }, facturaId: { required: true, type: () => Number }, producto: { required: true, type: () => require("../../productos/entities/producto.entity").Producto }, productoId: { required: true, type: () => Number } };
    }
};
exports.DetalleFactura = DetalleFactura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', length: 255 }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unidad_medida', length: 20, default: 'UND' }),
    __metadata("design:type", String)
], DetalleFactura.prototype, "unidadMedida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "descuento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_impuesto', type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "baseImpuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 19 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "porcentajeImpuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "impuesto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DetalleFactura.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => factura_entity_1.Factura, (factura) => factura.id),
    (0, typeorm_1.JoinColumn)({ name: 'factura_id' }),
    __metadata("design:type", factura_entity_1.Factura)
], DetalleFactura.prototype, "factura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'factura_id' }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "facturaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", producto_entity_1.Producto)
], DetalleFactura.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'producto_id', nullable: true }),
    __metadata("design:type", Number)
], DetalleFactura.prototype, "productoId", void 0);
exports.DetalleFactura = DetalleFactura = __decorate([
    (0, typeorm_1.Entity)('detalles_factura')
], DetalleFactura);
//# sourceMappingURL=detalle-factura.entity.js.map