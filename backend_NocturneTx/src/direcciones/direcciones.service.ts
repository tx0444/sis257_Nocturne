import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private direccionRepository: Repository<Direccion>,
  ) {}

  async getAll(usuarioId: number) {
    return this.direccionRepository.find({
      where: { usuarioId, activa: true },
      order: { esDefault: 'DESC', createdAt: 'DESC' },
    });
  }

  async create(usuarioId: number, dto: CreateDireccionDto) {
    // If this is set as default, unset others
    if (dto.esDefault) {
      await this.direccionRepository.update(
        { usuarioId },
        { esDefault: false },
      );
    }

    const direccion = this.direccionRepository.create({
      ...dto,
      usuarioId,
    });

    return this.direccionRepository.save(direccion);
  }

  async update(usuarioId: number, id: number, dto: CreateDireccionDto) {
    const direccion = await this.direccionRepository.findOne({
      where: { id, usuarioId },
    });

    if (!direccion) {
      throw new NotFoundException('Dirección no encontrada');
    }

    if (dto.esDefault) {
      await this.direccionRepository.update(
        { usuarioId },
        { esDefault: false },
      );
    }

    Object.assign(direccion, dto);
    return this.direccionRepository.save(direccion);
  }

  async delete(usuarioId: number, id: number) {
    const direccion = await this.direccionRepository.findOne({
      where: { id, usuarioId },
    });

    if (!direccion) {
      throw new NotFoundException('Dirección no encontrada');
    }

    direccion.activa = false;
    return this.direccionRepository.save(direccion);
  }
}