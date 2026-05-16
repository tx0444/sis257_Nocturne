"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnviosSegurosModule = void 0;
const common_1 = require("@nestjs/common");
const envios_seguros_controller_1 = require("./envios-seguros.controller");
const envios_seguros_service_1 = require("./envios-seguros.service");
let EnviosSegurosModule = class EnviosSegurosModule {
};
exports.EnviosSegurosModule = EnviosSegurosModule;
exports.EnviosSegurosModule = EnviosSegurosModule = __decorate([
    (0, common_1.Module)({
        controllers: [envios_seguros_controller_1.EnviosSegurosController],
        providers: [envios_seguros_service_1.EnviosSegurosService]
    })
], EnviosSegurosModule);
//# sourceMappingURL=envios-seguros.module.js.map