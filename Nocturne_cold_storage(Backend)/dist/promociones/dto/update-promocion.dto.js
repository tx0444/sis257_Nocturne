"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePromocionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_promocion_dto_1 = require("./create-promocion.dto");
class UpdatePromocionDto extends (0, mapped_types_1.PartialType)(create_promocion_dto_1.CreatePromocionDto) {
}
exports.UpdatePromocionDto = UpdatePromocionDto;
//# sourceMappingURL=update-promocion.dto.js.map