import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async create(createClienteDto: CreateClienteDto, usuarioAutenticado: Usuario | null = null): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    const savedCliente = await this.clienteRepository.save(cliente);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'CREAR',
      'CLIENTES',
      savedCliente.id,
      `Se registró al cliente ${savedCliente.nombre} ${savedCliente.apellido} con CI/NIT: ${savedCliente.ciNit || 'N/A'}.`,
    );

    return savedCliente;
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  /**
   * Búsqueda en tiempo real por nombre, apellido o CI/NIT
   */
  async buscar(termino: string): Promise<Cliente[]> {
    return this.clienteRepository.find({
      where: [
        { nombre: ILike(`%${termino}%`) },
        { apellido: ILike(`%${termino}%`) },
        { ciNit: ILike(`%${termino}%`) },
      ],
      take: 10,
      order: { nombre: 'ASC' },
    });
  }

  /**
   * Busca o crea el cliente "Consumidor Final" con NIT "0"
   */
  async getOrCreateConsumidorFinal(): Promise<Cliente> {
    let consumidor = await this.clienteRepository.findOne({
      where: { ciNit: '0', nombre: 'Consumidor', apellido: 'Final' },
    });
    if (!consumidor) {
      consumidor = this.clienteRepository.create({
        nombre: 'Consumidor',
        apellido: 'Final',
        ciNit: '0',
        estado: true,
      });
      consumidor = await this.clienteRepository.save(consumidor);
    }
    return consumidor;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto, usuarioAutenticado: Usuario | null = null): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    const savedCliente = await this.clienteRepository.save(cliente);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'EDITAR',
      'CLIENTES',
      id,
      `Se modificó el cliente ${cliente.nombre} ${cliente.apellido}. Cambios realizados.`,
    );

    return savedCliente;
  }

  async remove(id: number, usuarioAutenticado: Usuario | null = null): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.softRemove(cliente);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'ELIMINAR',
      'CLIENTES',
      id,
      `Se eliminó al cliente ${cliente.nombre} ${cliente.apellido} con CI/NIT: ${cliente.ciNit || 'N/A'}.`,
    );
  }
}
