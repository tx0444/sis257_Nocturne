"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFacturaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_factura_dto_1 = require("./create-factura.dto");
class UpdateFacturaDto extends (0, swagger_1.PartialType)(create_factura_dto_1.CreateFacturaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateFacturaDto = UpdateFacturaDto;
//# sourceMappingURL=update-factura.dto.js.map