"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRolDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_rol_dto_1 = require("./create-rol.dto");
class UpdateRolDto extends (0, swagger_1.PartialType)(create_rol_dto_1.CreateRolDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateRolDto = UpdateRolDto;
//# sourceMappingURL=update-rol.dto.js.map