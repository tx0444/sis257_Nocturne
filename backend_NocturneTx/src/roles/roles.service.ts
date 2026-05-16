import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ROLE_ADMIN, ROLE_USUARIO, ROLE_VENDEDOR } from '../auth/constants';

@Injectable()
export class RolesService implements OnModuleInit {
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

  async onModuleInit(): Promise<void> {
    await this.seedDefaultRoles();
  }

  async seedDefaultRoles(): Promise<void> {
    const defaults: Array<Pick<Rol, 'nombre' | 'descripcion' | 'permisos'>> = [
      {
        nombre: ROLE_ADMIN,
        descripcion: 'Administrador del sistema',
        permisos: ['crear', 'editar', 'eliminar', 'ver'],
      },
      {
        nombre: ROLE_VENDEDOR,
        descripcion: 'Personal de ventas',
        permisos: ['crear', 'editar', 'ver'],
      },
      {
        nombre: ROLE_USUARIO,
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
}