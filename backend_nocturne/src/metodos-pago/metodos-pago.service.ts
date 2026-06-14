import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';

@Injectable()
export class MetodosPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createDto: CreateMetodoPagoDto): Promise<MetodoPago> {
    const metodo = this.metodoPagoRepository.create(createDto);
    return this.metodoPagoRepository.save(metodo);
  }

  async findAll(): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<MetodoPago> {
    const metodo = await this.metodoPagoRepository.findOne({ where: { id } });
    if (!metodo) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    }
    return metodo;
  }

  async update(id: number, updateDto: UpdateMetodoPagoDto): Promise<MetodoPago> {
    const metodo = await this.findOne(id);
    Object.assign(metodo, updateDto);
    return this.metodoPagoRepository.save(metodo);
  }

  async remove(id: number): Promise<void> {
    const metodo = await this.findOne(id);
    await this.metodoPagoRepository.softRemove(metodo);
  }
}
