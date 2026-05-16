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
exports.Producto = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const categorias_entity_1 = require("../../categorias/entities/categorias.entity");
const proveedor_entity_1 = require("../../proveedores/entities/proveedor.entity");
const inventario_entity_1 = require("../../inventarios/entities/inventario.entity");
const detalle_venta_entity_1 = require("../../detalles-venta/entities/detalle-venta.entity");
let Producto = class Producto {
    id;
    nombre;
    descripcion;
    gradoAlcoholico;
    requiereFrio;
    precioCompra;
    precioVenta;
    unidad;
    codigoBarras;
    imagenUrl;
    activo;
    createdAt;
    updatedAt;
    categoria;
    categoriaId;
    proveedor;
    proveedorId;
    inventarios;
    detallesVenta;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, gradoAlcoholico: { required: true, type: () => Number }, requiereFrio: { required: true, type: () => Boolean }, precioCompra: { required: true, type: () => Number }, precioVenta: { required: true, type: () => Number }, unidad: { required: true, type: () => String }, codigoBarras: { required: true, type: () => String }, imagenUrl: { required: true, type: () => String }, activo: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, categoria: { required: true, type: () => require("../../categorias/entities/categorias.entity").Categoria }, categoriaId: { required: true, type: () => Number }, proveedor: { required: true, type: () => require("../../proveedores/entities/proveedor.entity").Proveedor }, proveedorId: { required: true, type: () => Number }, inventarios: { required: true, type: () => [require("../../inventarios/entities/inventario.entity").Inventario] }, detallesVenta: { required: true, type: () => [require("../../detalles-venta/entities/detalle-venta.entity").DetalleVenta] } };
    }
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grado_alcoholico', type: 'decimal', precision: 4, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "gradoAlcoholico", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requiere_frio', default: false }),
    __metadata("design:type", Boolean)
], Producto.prototype, "requiereFrio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_compra', type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "precioCompra", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_venta', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Producto.prototype, "precioVenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "unidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo_barras', length: 50, nullable: true, unique: true }),
    __metadata("design:type", String)
], Producto.prototype, "codigoBarras", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imagen_url', length: 500, nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "imagenUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Producto.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Producto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Producto.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorias_entity_1.Categoria, (categoria) => categoria.productos),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categorias_entity_1.Categoria)
], Producto.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria_id', nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proveedor_entity_1.Proveedor, (proveedor) => proveedor.productos),
    (0, typeorm_1.JoinColumn)({ name: 'proveedor_id' }),
    __metadata("design:type", proveedor_entity_1.Proveedor)
], Producto.prototype, "proveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'proveedor_id', nullable: true }),
    __metadata("design:type", Number)
], Producto.prototype, "proveedorId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventario_entity_1.Inventario, (inventario) => inventario.producto),
    __metadata("design:type", Array)
], Producto.prototype, "inventarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalle_venta_entity_1.DetalleVenta, (detalle) => detalle.producto),
    __metadata("design:type", Array)
], Producto.prototype, "detallesVenta", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)('productos')
], Producto);
//# sourceMappingURL=producto.entity.js.map