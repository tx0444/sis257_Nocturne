"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const rol_entity_1 = require("../roles/entities/rol.entity");
const constants_1 = require("./constants");
let AuthService = class AuthService {
    usuarioRepository;
    rolRepository;
    jwtService;
    constructor(usuarioRepository, rolRepository, jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.jwtService = jwtService;
    }
    normalizeRol(nombre) {
        return (nombre ?? constants_1.ROLE_USUARIO).toLowerCase();
    }
    async validateUser(emailOrNick, password) {
        const usuario = await this.usuarioRepository.findOne({
            where: [{ email: emailOrNick }, { nickname: emailOrNick }],
            relations: ['rol'],
        });
        if (!usuario || !usuario.activo) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return usuario;
    }
    async login(loginDto) {
        const usuario = await this.validateUser(loginDto.emailOrNick, loginDto.password);
        const rolNombre = this.normalizeRol(usuario.rol?.nombre);
        const payload = {
            sub: usuario.id,
            email: usuario.email,
            rol: rolNombre,
        };
        usuario.ultimoLogin = new Date();
        await this.usuarioRepository.save(usuario);
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: rolNombre,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.usuarioRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException('El email ya está registrado');
        }
        if (registerDto.nickname) {
            const existingNick = await this.usuarioRepository.findOne({
                where: { nickname: registerDto.nickname },
            });
            if (existingNick) {
                throw new common_1.UnauthorizedException('El nickname ya está en uso');
            }
        }
        let rolId = registerDto.rolId;
        if (rolId) {
            const rol = await this.rolRepository.findOne({ where: { id: rolId } });
            if (!rol) {
                throw new common_1.BadRequestException(`Rol con ID ${rolId} no existe`);
            }
        }
        else {
            const rolUsuario = await this.rolRepository.findOne({
                where: { nombre: constants_1.ROLE_USUARIO },
            });
            if (!rolUsuario) {
                throw new common_1.BadRequestException('No existe el rol "usuario". Reinicia el servidor para crear roles por defecto.');
            }
            rolId = rolUsuario.id;
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const usuarioData = {
            nombre: registerDto.nombre,
            email: registerDto.email,
            password: hashedPassword,
            rolId,
        };
        if (registerDto.nickname) {
            usuarioData.nickname = registerDto.nickname;
        }
        if (registerDto.telefono) {
            usuarioData.telefono = registerDto.telefono;
        }
        if (registerDto.direccion) {
            usuarioData.direccion = registerDto.direccion;
        }
        const savedUser = await this.usuarioRepository.save(this.usuarioRepository.create(usuarioData));
        const usuario = await this.usuarioRepository.findOne({
            where: { id: savedUser.id },
            relations: ['rol'],
        });
        const rolNombre = this.normalizeRol(usuario?.rol?.nombre);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email,
            rol: rolNombre,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: savedUser.id,
                nombre: savedUser.nombre,
                email: savedUser.email,
                rol: rolNombre,
            },
        };
    }
    async getProfile(userId) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: userId },
            relations: ['rol'],
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const { password: _password, ...perfil } = usuario;
        return {
            ...perfil,
            rol: usuario.rol
                ? { id: usuario.rol.id, nombre: usuario.rol.nombre }
                : { nombre: constants_1.ROLE_USUARIO },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map