"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProveedoreDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_proveedore_dto_1 = require("./create-proveedore.dto");
class UpdateProveedoreDto extends (0, swagger_1.PartialType)(create_proveedore_dto_1.CreateProveedoreDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProveedoreDto = UpdateProveedoreDto;
//# sourceMappingURL=update-proveedore.dto.js.map