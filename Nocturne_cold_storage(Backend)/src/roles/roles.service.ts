import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    const rol = this.rolRepository.create(createRolDto);
    return this.rolRepository.save(rol);
  }

  async findAll(): Promise<Rol[]> {
    return this.rolRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({
      where: { id },
      relations: ['usuarios'],
    });
    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return rol;
  }

  async findByNombre(nombre: string): Promise<Rol | null> {
    return this.rolRepository.findOne({ where: { nombre } });
  }

  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    const rol = await this.findOne(id);
    Object.assign(rol, updateRolDto);
    return this.rolRepository.save(rol);
  }

  async remove(id: number): Promise<void> {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
  }

  async tienePermiso(rolId: number, permiso: string): Promise<boolean> {
    const rol = await this.findOne(rolId);
    return rol.permisos?.includes(permiso) || false;
  }
}