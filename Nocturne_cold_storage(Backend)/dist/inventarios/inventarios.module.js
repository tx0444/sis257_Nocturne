"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventariosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventarios_service_1 = require("./inventarios.service");
const inventarios_controller_1 = require("./inventarios.controller");
const inventario_entity_1 = require("./entities/inventario.entity");
let InventariosModule = class InventariosModule {
};
exports.InventariosModule = InventariosModule;
exports.InventariosModule = InventariosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inventario_entity_1.Inventario])],
        controllers: [inventarios_controller_1.InventariosController],
        providers: [inventarios_service_1.InventariosService],
        exports: [inventarios_service_1.InventariosService],
    })
], InventariosModule);
//# sourceMappingURL=inventarios.module.js.map