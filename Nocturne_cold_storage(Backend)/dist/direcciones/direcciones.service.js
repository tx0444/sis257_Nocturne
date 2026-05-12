"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DireccionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const direccion_entity_1 = require("./entities/direccion.entity");
let DireccionesService = class DireccionesService {
    direccionRepository;
    constructor(direccionRepository) {
        this.direccionRepository = direccionRepository;
    }
    async getAll(usuarioId) {
        return this.direccionRepository.find({
            where: { usuarioId, activa: true },
            order: { esDefault: 'DESC', createdAt: 'DESC' },
        });
    }
    async create(usuarioId, dto) {
        if (dto.esDefault) {
            await this.direccionRepository.update({ usuarioId }, { esDefault: false });
        }
        const direccion = this.direccionRepository.create({
            ...dto,
            usuarioId,
        });
        return this.direccionRepository.save(direccion);
    }
    async update(usuarioId, id, dto) {
        const direccion = await this.direccionRepository.findOne({
            where: { id, usuarioId },
        });
        if (!direccion) {
            throw new common_1.NotFoundException('Dirección no encontrada');
        }
        if (dto.esDefault) {
            await this.direccionRepository.update({ usuarioId }, { esDefault: false });
        }
        Object.assign(direccion, dto);
        return this.direccionRepository.save(direccion);
    }
    async delete(usuarioId, id) {
        const direccion = await this.direccionRepository.findOne({
            where: { id, usuarioId },
        });
        if (!direccion) {
            throw new common_1.NotFoundException('Dirección no encontrada');
        }
        direccion.activa = false;
        return this.direccionRepository.save(direccion);
    }
};
exports.DireccionesService = DireccionesService;
exports.DireccionesService = DireccionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(direccion_entity_1.Direccion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DireccionesService);
//# sourceMappingURL=direcciones.service.js.map