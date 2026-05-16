"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitacorasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bitacoras_service_1 = require("./bitacoras.service");
const bitacoras_controller_1 = require("./bitacoras.controller");
const bitacora_entity_1 = require("./entities/bitacora.entity");
let BitacorasModule = class BitacorasModule {
};
exports.BitacorasModule = BitacorasModule;
exports.BitacorasModule = BitacorasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bitacora_entity_1.Bitacora])],
        controllers: [bitacoras_controller_1.BitacorasController],
        providers: [bitacoras_service_1.BitacorasService],
        exports: [bitacoras_service_1.BitacorasService],
    })
], BitacorasModule);
//# sourceMappingURL=bitacoras.module.js.map