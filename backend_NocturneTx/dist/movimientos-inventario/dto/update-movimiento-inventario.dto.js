"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovimientoInventarioDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_movimiento_inventario_dto_1 = require("./create-movimiento-inventario.dto");
class UpdateMovimientoInventarioDto extends (0, swagger_1.PartialType)(create_movimiento_inventario_dto_1.CreateMovimientoInventarioDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateMovimientoInventarioDto = UpdateMovimientoInventarioDto;
//# sourceMappingURL=update-movimiento-inventario.dto.js.map