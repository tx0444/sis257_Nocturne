import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedoreDto: CreateProveedoreDto): Promise<Proveedor> {
    // Verificar si el NIT ya existe
    if (createProveedoreDto.nit) {
      const existente = await this.proveedorRepository.findOne({
        where: { nit: createProveedoreDto.nit },
      });
      if (existente) {
        throw new ConflictException('El NIT ya está registrado');
      }
    }
    const proveedor = this.proveedorRepository.create(createProveedoreDto);
    return this.proveedorRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      relations: ['productos'],
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return proveedor;
  }

  async findByNit(nit: string): Promise<Proveedor | null> {
    return this.proveedorRepository.findOne({ where: { nit } });
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto): Promise<Proveedor> {
    const proveedor = await this.findOne(id);

    // Verificar NIT único si cambia
    if (updateProveedoreDto.nit && updateProveedoreDto.nit !== proveedor.nit) {
      const existente = await this.proveedorRepository.findOne({
        where: { nit: updateProveedoreDto.nit },
      });
      if (existente) {
        throw new ConflictException('El NIT ya está registrado');
      }
    }

    Object.assign(proveedor, updateProveedoreDto);
    return this.proveedorRepository.save(proveedor);
  }

  async remove(id: number): Promise<void> {
    const proveedor = await this.findOne(id);
    await this.proveedorRepository.remove(proveedor);
  }

  async buscar(termino: string): Promise<Proveedor[]> {
    return this.proveedorRepository
      .createQueryBuilder('proveedor')
      .where('proveedor.nombre LIKE :termino', { termino: `%${termino}%` })
      .orWhere('proveedor.nit LIKE :termino', { termino: `%${termino}%` })
      .getMany();
  }

  async getActivos(): Promise<Proveedor[]> {
    return this.proveedorRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' },
    });
  }
}