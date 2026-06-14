import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Rol } from '../roles/entities/rol.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async registerClient(registerDto: any): Promise<Usuario> {
    const existente = await this.usuarioRepository.findOne({
      where: [
        { correo: registerDto.correo },
        { usuario: registerDto.usuario },
      ],
    });
    if (existente) {
      throw new ConflictException('El correo o usuario ya está registrado');
    }

    let rolCliente = await this.rolRepository.findOne({ where: { nombre: 'CLIENTE' } });
    if (!rolCliente) {
      rolCliente = await this.rolRepository.save(
        this.rolRepository.create({ nombre: 'CLIENTE', descripcion: 'Cliente de la licorería' })
      );
    }

    const usuario = this.usuarioRepository.create({
      nombre: registerDto.nombre,
      apellido: registerDto.apellido,
      correo: registerDto.correo,
      usuario: registerDto.usuario,
      password: registerDto.password,
      rolId: rolCliente.id,
      estado: true,
    });
    const usuarioSalvado = await this.usuarioRepository.save(usuario);

    const cliente = this.clienteRepository.create({
      nombre: registerDto.nombre,
      apellido: registerDto.apellido,
      correo: registerDto.correo,
      ciNit: registerDto.ciNit || '0000000',
      telefono: registerDto.telefono || '',
      direccion: registerDto.direccion || '',
      estado: true,
    });
    await this.clienteRepository.save(cliente);

    usuarioSalvado.password = '';
    return usuarioSalvado;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existente = await this.usuarioRepository.findOne({
      where: [
        { correo: createUsuarioDto.correo },
        { usuario: createUsuarioDto.usuario },
      ],
    });
    if (existente) {
      throw new ConflictException('El correo o usuario ya está registrado');
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

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.softRemove(usuario);
  }

  async validate(usuarioLogin: string, clave: string): Promise<Usuario> {
    const usuarioOk = await this.usuarioRepository.findOne({
      where: { usuario: usuarioLogin },
      relations: ['rol'],
    });

    if (!usuarioOk) {
      throw new NotFoundException('Usuario inexistente');
    }

    if (!(await usuarioOk.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    usuarioOk.password = '';
    return usuarioOk;
  }
}
