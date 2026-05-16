import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si el email ya existe
    const existente = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });
    if (existente) {
      throw new ConflictException('El email ya está registrado');
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['rol'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
      relations: ['rol'],
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);

    // Si cambia el email, verificar que no exista
    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const existente = await this.usuarioRepository.findOne({
        where: { email: updateUsuarioDto.email },
      });
      if (existente) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async updateLastLogin(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    usuario.ultimoLogin = new Date();
    await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  async findByRol(rolId: number): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { rolId },
      order: { nombre: 'ASC' },
    });
  }

  async verificarPermiso(usuarioId: number, permiso: string): Promise<boolean> {
    const usuario = await this.findOne(usuarioId);
    return usuario.rol?.permisos?.includes(permiso) || false;
  }
}