"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovimientoInventarioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_movimiento_inventario_dto_1 = require("./create-movimiento-inventario.dto");
class UpdateMovimientoInventarioDto extends (0, mapped_types_1.PartialType)(create_movimiento_inventario_dto_1.CreateMovimientoInventarioDto) {
}
exports.UpdateMovimientoInventarioDto = UpdateMovimientoInventarioDto;
//# sourceMappingURL=update-movimiento-inventario.dto.js.map