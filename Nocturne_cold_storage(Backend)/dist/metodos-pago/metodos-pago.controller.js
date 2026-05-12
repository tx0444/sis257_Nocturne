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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodosPagoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const metodos_pago_service_1 = require("./metodos-pago.service");
const create_metodo_pago_dto_1 = require("./dto/create-metodo-pago.dto");
const update_metodo_pago_dto_1 = require("./dto/update-metodo-pago.dto");
const metodo_pago_entity_1 = require("./entities/metodo-pago.entity");
let MetodosPagoController = class MetodosPagoController {
    metodosPagoService;
    constructor(metodosPagoService) {
        this.metodosPagoService = metodosPagoService;
    }
    create(createMetodoPagoDto) {
        return this.metodosPagoService.create(createMetodoPagoDto);
    }
    seed() {
        return this.metodosPagoService.seed();
    }
    findAll() {
        return this.metodosPagoService.findAll();
    }
    findAllAdmin() {
        return this.metodosPagoService.findAllAdmin();
    }
    findOne(id) {
        return this.metodosPagoService.findOne(id);
    }
    findByTipo(tipo) {
        return this.metodosPagoService.findByTipo(tipo);
    }
    update(id, updateMetodoPagoDto) {
        return this.metodosPagoService.update(id, updateMetodoPagoDto);
    }
    remove(id) {
        return this.metodosPagoService.remove(id);
    }
    activar(id) {
        return this.metodosPagoService.activar(id);
    }
    calcularComision(id, monto) {
        return this.metodosPagoService.calcularComision(id, monto);
    }
};
exports.MetodosPagoController = MetodosPagoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo método de pago' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Método creado', type: metodo_pago_entity_1.MetodoPago }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_metodo_pago_dto_1.CreateMetodoPagoDto]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Cargar métodos de pago por defecto (11 métodos)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Métodos cargados exitosamente' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar métodos de pago activos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de métodos', type: [metodo_pago_entity_1.MetodoPago] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los métodos (incluye inactivos)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista completa', type: [metodo_pago_entity_1.MetodoPago] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener método de pago por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Método encontrado', type: metodo_pago_entity_1.MetodoPago }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('tipo/:tipo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar método de pago por tipo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Método encontrado', type: metodo_pago_entity_1.MetodoPago }),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "findByTipo", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar método de pago' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Actualizado', type: metodo_pago_entity_1.MetodoPago }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_metodo_pago_dto_1.UpdateMetodoPagoDto]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Desactivar método de pago (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Desactivado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/activar'),
    (0, swagger_1.ApiOperation)({ summary: 'Activar método de pago' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Activado', type: metodo_pago_entity_1.MetodoPago }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "activar", null);
__decorate([
    (0, common_1.Get)(':id/calcular-comision/:monto'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcular comisión para un monto dado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comisión calculada' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('monto', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MetodosPagoController.prototype, "calcularComision", null);
exports.MetodosPagoController = MetodosPagoController = __decorate([
    (0, swagger_1.ApiTags)('Métodos de Pago'),
    (0, common_1.Controller)('metodos-pago'),
    __metadata("design:paramtypes", [metodos_pago_service_1.MetodosPagoService])
], MetodosPagoController);
//# sourceMappingURL=metodos-pago.controller.js.map