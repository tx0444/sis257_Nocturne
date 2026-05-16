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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rol_entity_1 = require("./entities/rol.entity");
const constants_1 = require("../auth/constants");
let RolesService = class RolesService {
    rolRepository;
    constructor(rolRepository) {
        this.rolRepository = rolRepository;
    }
    async create(createRolDto) {
        const rol = this.rolRepository.create(createRolDto);
        return this.rolRepository.save(rol);
    }
    async findAll() {
        return this.rolRepository.find({
            order: { nombre: 'ASC' },
        });
    }
    async findOne(id) {
        const rol = await this.rolRepository.findOne({
            where: { id },
            relations: ['usuarios'],
        });
        if (!rol) {
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        }
        return rol;
    }
    async findByNombre(nombre) {
        return this.rolRepository.findOne({ where: { nombre } });
    }
    async update(id, updateRolDto) {
        const rol = await this.findOne(id);
        Object.assign(rol, updateRolDto);
        return this.rolRepository.save(rol);
    }
    async remove(id) {
        const rol = await this.findOne(id);
        await this.rolRepository.remove(rol);
    }
    async tienePermiso(rolId, permiso) {
        const rol = await this.findOne(rolId);
        return rol.permisos?.includes(permiso) || false;
    }
    async onModuleInit() {
        await this.seedDefaultRoles();
    }
    async seedDefaultRoles() {
        const defaults = [
            {
                nombre: constants_1.ROLE_ADMIN,
                descripcion: 'Administrador del sistema',
                permisos: ['crear', 'editar', 'eliminar', 'ver'],
            },
            {
                nombre: constants_1.ROLE_VENDEDOR,
                descripcion: 'Personal de ventas',
                permisos: ['crear', 'editar', 'ver'],
            },
            {
                nombre: constants_1.ROLE_USUARIO,
                descripcion: 'Cliente / usuario de tienda',
                permisos: ['ver'],
            },
        ];
        for (const rolData of defaults) {
            const exists = await this.rolRepository.findOne({ where: { nombre: rolData.nombre } });
            if (!exists) {
                await this.rolRepository.save(this.rolRepository.create(rolData));
            }
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map