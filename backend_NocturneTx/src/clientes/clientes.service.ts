import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  async findByNit(nit: string): Promise<Cliente | null> {
    return this.clienteRepository.findOne({ where: { nit } });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }

  async agregarPuntos(id: number, puntos: number): Promise<Cliente> {
    const cliente = await this.findOne(id);
    cliente.puntosFidelidad += puntos;
    return this.clienteRepository.save(cliente);
  }

  async buscarPorNombre(termino: string): Promise<Cliente[]> {
    return this.clienteRepository
      .createQueryBuilder('cliente')
      .where('cliente.nombre LIKE :termino', { termino: `%${termino}%` })
      .orWhere('cliente.nit LIKE :termino', { termino: `%${termino}%` })
      .getMany();
  }
}