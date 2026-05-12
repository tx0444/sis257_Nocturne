import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario | null>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
    updateLastLogin(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    findByRol(rolId: number): Promise<Usuario[]>;
    verificarPermiso(usuarioId: number, permiso: string): Promise<boolean>;
}
