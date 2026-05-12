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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
let UsuariosService = class UsuariosService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async create(createUsuarioDto) {
        const existente = await this.usuarioRepository.findOne({
            where: { email: createUsuarioDto.email },
        });
        if (existente) {
            throw new common_1.ConflictException('El email ya está registrado');
        }
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return this.usuarioRepository.save(usuario);
    }
    async findAll() {
        return this.usuarioRepository.find({
            relations: ['rol'],
            order: { nombre: 'ASC' },
        });
    }
    async findOne(id) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }
    async findByEmail(email) {
        return this.usuarioRepository.findOne({
            where: { email },
            relations: ['rol'],
        });
    }
    async update(id, updateUsuarioDto) {
        const usuario = await this.findOne(id);
        if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
            const existente = await this.usuarioRepository.findOne({
                where: { email: updateUsuarioDto.email },
            });
            if (existente) {
                throw new common_1.ConflictException('El email ya está registrado');
            }
        }
        Object.assign(usuario, updateUsuarioDto);
        return this.usuarioRepository.save(usuario);
    }
    async updateLastLogin(id) {
        const usuario = await this.findOne(id);
        usuario.ultimoLogin = new Date();
        await this.usuarioRepository.save(usuario);
    }
    async remove(id) {
        const usuario = await this.findOne(id);
        await this.usuarioRepository.remove(usuario);
    }
    async findByRol(rolId) {
        return this.usuarioRepository.find({
            where: { rolId },
            order: { nombre: 'ASC' },
        });
    }
    async verificarPermiso(usuarioId, permiso) {
        const usuario = await this.findOne(usuarioId);
        return usuario.rol?.permisos?.includes(permiso) || false;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map