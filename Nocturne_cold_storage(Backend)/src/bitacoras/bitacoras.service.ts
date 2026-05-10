import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bitacora, AccionBitacora } from './entities/bitacora.entity';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';

@Injectable()
export class BitacorasService {
  constructor(
    @InjectRepository(Bitacora)
    private readonly bitacoraRepository: Repository<Bitacora>,
  ) {}

  async create(createBitacoraDto: CreateBitacoraDto): Promise<Bitacora> {
    const bitacora = this.bitacoraRepository.create({
      ...createBitacoraDto,
      ip: '127.0.0.1', // Se puede obtener del request
    });
    return this.bitacoraRepository.save(bitacora);
  }

  async registrar(
    accion: AccionBitacora,
    tabla: string,
    registroId: number,
    datosAnteriores: any,
    datosNuevos: any,
    usuarioId: number,
    descripcion?: string,
  ): Promise<Bitacora> {
    return this.create({
      accion,
      nombreTabla: tabla,
      idRegistro: registroId,
      datosAnteriores,
      datosNuevos,
      usuarioId,
      descripcion,
    });
  }

  async findAll(): Promise<Bitacora[]> {
    return this.bitacoraRepository.find({
      relations: ['usuario'],
      order: { fechaAccion: 'DESC' },
    });
  }

  async findByTable(tabla: string): Promise<Bitacora[]> {
    return this.bitacoraRepository.find({
      where: { nombreTabla: tabla },
      relations: ['usuario'],
      order: { fechaAccion: 'DESC' },
    });
  }

  async findByUser(usuarioId: number): Promise<Bitacora[]> {
    return this.bitacoraRepository.find({
      where: { usuarioId },
      order: { fechaAccion: 'DESC' },
    });
  }

  async findByDateRange(inicio: Date, fin: Date): Promise<Bitacora[]> {
    return this.bitacoraRepository
      .createQueryBuilder('bitacora')
      .leftJoinAndSelect('bitacora.usuario', 'usuario')
      .where('bitacora.fechaAccion BETWEEN :inicio AND :fin', { inicio, fin })
      .orderBy('bitacora.fechaAccion', 'DESC')
      .getMany();
  }

  async findByAccion(accion: AccionBitacora): Promise<Bitacora[]> {
    return this.bitacoraRepository.find({
      where: { accion },
      relations: ['usuario'],
      order: { fechaAccion: 'DESC' },
    });
  }

  async getReporte(inicio: Date, fin: Date): Promise<any> {
    const bitacoras = await this.findByDateRange(inicio, fin);
    
    // Agrupar por tabla
    const porTabla = bitacoras.reduce((acc, b) => {
      acc[b.nombreTabla] = (acc[b.nombreTabla] || 0) + 1;
      return acc;
    }, {});

    // Agrupar por accion
    const porAccion = bitacoras.reduce((acc, b) => {
      acc[b.accion] = (acc[b.accion] || 0) + 1;
      return acc;
    }, {});

    return {
      total: bitacoras.length,
      rango: { inicio, fin },
      porTabla,
      porAccion,
      registros: bitacoras,
    };
  }
}