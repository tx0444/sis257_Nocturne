"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventarioDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_inventario_dto_1 = require("./create-inventario.dto");
class UpdateInventarioDto extends (0, swagger_1.PartialType)(create_inventario_dto_1.CreateInventarioDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateInventarioDto = UpdateInventarioDto;
//# sourceMappingURL=update-inventario.dto.js.map