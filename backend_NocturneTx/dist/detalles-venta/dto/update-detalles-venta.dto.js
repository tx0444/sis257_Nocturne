"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDetallesVentaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_detalles_venta_dto_1 = require("./create-detalles-venta.dto");
class UpdateDetallesVentaDto extends (0, swagger_1.PartialType)(create_detalles_venta_dto_1.CreateDetallesVentaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateDetallesVentaDto = UpdateDetallesVentaDto;
//# sourceMappingURL=update-detalles-venta.dto.js.map