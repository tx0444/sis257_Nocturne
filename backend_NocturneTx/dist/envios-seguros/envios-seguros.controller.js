"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnviosSegurosController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
let EnviosSegurosController = class EnviosSegurosController {
};
exports.EnviosSegurosController = EnviosSegurosController;
exports.EnviosSegurosController = EnviosSegurosController = __decorate([
    (0, swagger_1.ApiTags)('envíos seguros'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.Roles)(constants_1.ROLE_ADMIN),
    (0, common_1.Controller)('envios-seguros')
], EnviosSegurosController);
//# sourceMappingURL=envios-seguros.controller.js.map