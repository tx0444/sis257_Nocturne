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
exports.BitacorasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bitacora_entity_1 = require("./entities/bitacora.entity");
let BitacorasService = class BitacorasService {
    bitacoraRepository;
    constructor(bitacoraRepository) {
        this.bitacoraRepository = bitacoraRepository;
    }
    async create(createBitacoraDto) {
        const bitacora = this.bitacoraRepository.create({
            ...createBitacoraDto,
            ip: '127.0.0.1',
        });
        return this.bitacoraRepository.save(bitacora);
    }
    async registrar(accion, tabla, registroId, datosAnteriores, datosNuevos, usuarioId, descripcion) {
        return this.create({
            accion,
            nombreTabla: tabla,
            idRegistro: registroId,
            datosAnteriores,
            datosNuevos,
            usuarioId,
            descripcion,
        });
    }
    async findAll() {
        return this.bitacoraRepository.find({
            relations: ['usuario'],
            order: { fechaAccion: 'DESC' },
        });
    }
    async findByTable(tabla) {
        return this.bitacoraRepository.find({
            where: { nombreTabla: tabla },
            relations: ['usuario'],
            order: { fechaAccion: 'DESC' },
        });
    }
    async findByUser(usuarioId) {
        return this.bitacoraRepository.find({
            where: { usuarioId },
            order: { fechaAccion: 'DESC' },
        });
    }
    async findByDateRange(inicio, fin) {
        return this.bitacoraRepository
            .createQueryBuilder('bitacora')
            .leftJoinAndSelect('bitacora.usuario', 'usuario')
            .where('bitacora.fechaAccion BETWEEN :inicio AND :fin', { inicio, fin })
            .orderBy('bitacora.fechaAccion', 'DESC')
            .getMany();
    }
    async findByAccion(accion) {
        return this.bitacoraRepository.find({
            where: { accion },
            relations: ['usuario'],
            order: { fechaAccion: 'DESC' },
        });
    }
    async getReporte(inicio, fin) {
        const bitacoras = await this.findByDateRange(inicio, fin);
        const porTabla = bitacoras.reduce((acc, b) => {
            acc[b.nombreTabla] = (acc[b.nombreTabla] || 0) + 1;
            return acc;
        }, {});
        const porAccion = bitacoras.reduce((acc, b) => {
            acc[b.accion] = (acc[b.accion] || 0) + 1;
            return acc;
        }, {});
        return {
            total: bitacoras.length,
            rango: { inicio, fin },
            porTabla,
            porAccion,
            registros: bitacoras,
        };
    }
};
exports.BitacorasService = BitacorasService;
exports.BitacorasService = BitacorasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bitacora_entity_1.Bitacora)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BitacorasService);
//# sourceMappingURL=bitacoras.service.js.map