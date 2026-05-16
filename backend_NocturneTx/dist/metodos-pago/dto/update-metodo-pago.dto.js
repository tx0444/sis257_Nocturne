"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMetodoPagoDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_metodo_pago_dto_1 = require("./create-metodo-pago.dto");
class UpdateMetodoPagoDto extends (0, swagger_1.PartialType)(create_metodo_pago_dto_1.CreateMetodoPagoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateMetodoPagoDto = UpdateMetodoPagoDto;
//# sourceMappingURL=update-metodo-pago.dto.js.map