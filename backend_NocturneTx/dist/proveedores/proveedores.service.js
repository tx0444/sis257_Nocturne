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
exports.ProveedoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proveedor_entity_1 = require("./entities/proveedor.entity");
let ProveedoresService = class ProveedoresService {
    proveedorRepository;
    constructor(proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }
    async create(createProveedoreDto) {
        if (createProveedoreDto.nit) {
            const existente = await this.proveedorRepository.findOne({
                where: { nit: createProveedoreDto.nit },
            });
            if (existente) {
                throw new common_1.ConflictException('El NIT ya está registrado');
            }
        }
        const proveedor = this.proveedorRepository.create(createProveedoreDto);
        return this.proveedorRepository.save(proveedor);
    }
    async findAll() {
        return this.proveedorRepository.find({
            relations: ['productos'],
            order: { nombre: 'ASC' },
        });
    }
    async findOne(id) {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id },
            relations: ['productos'],
        });
        if (!proveedor) {
            throw new common_1.NotFoundException(`Proveedor con ID ${id} no encontrado`);
        }
        return proveedor;
    }
    async findByNit(nit) {
        return this.proveedorRepository.findOne({ where: { nit } });
    }
    async update(id, updateProveedoreDto) {
        const proveedor = await this.findOne(id);
        if (updateProveedoreDto.nit && updateProveedoreDto.nit !== proveedor.nit) {
            const existente = await this.proveedorRepository.findOne({
                where: { nit: updateProveedoreDto.nit },
            });
            if (existente) {
                throw new common_1.ConflictException('El NIT ya está registrado');
            }
        }
        Object.assign(proveedor, updateProveedoreDto);
        return this.proveedorRepository.save(proveedor);
    }
    async remove(id) {
        const proveedor = await this.findOne(id);
        await this.proveedorRepository.remove(proveedor);
    }
    async buscar(termino) {
        return this.proveedorRepository
            .createQueryBuilder('proveedor')
            .where('proveedor.nombre LIKE :termino', { termino: `%${termino}%` })
            .orWhere('proveedor.nit LIKE :termino', { termino: `%${termino}%` })
            .getMany();
    }
    async getActivos() {
        return this.proveedorRepository.find({
            where: { activo: true },
            order: { nombre: 'ASC' },
        });
    }
};
exports.ProveedoresService = ProveedoresService;
exports.ProveedoresService = ProveedoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proveedor_entity_1.Proveedor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProveedoresService);
//# sourceMappingURL=proveedores.service.js.map