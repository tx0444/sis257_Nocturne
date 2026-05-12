import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago, TipoMetodo, EstadoMetodoPago } from './entities/metodo-pago.entity';
import { CreateMetodoPagoDto } from './dto/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodo-pago.dto';

@Injectable()
export class MetodosPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodoPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto): Promise<MetodoPago> {
    const metodoPago = this.metodoPagoRepository.create(createMetodoPagoDto);
    return this.metodoPagoRepository.save(metodoPago);
  }

  async seed(): Promise<void> {
    const metodosPorDefecto: CreateMetodoPagoDto[] = [
      { nombre: 'Efectivo', tipo: TipoMetodo.EFECTIVO, descripcion: 'Pago en efectivo en punto de venta', comisionPorcentaje: 0, activo: true },
      { nombre: 'Tarjeta Débito', tipo: TipoMetodo.TARJETA_DEBITO, descripcion: 'Pago con tarjeta débito', comisionPorcentaje: 1.5, activo: true },
      { nombre: 'Tarjeta Crédito', tipo: TipoMetodo.TARJETA_CREDITO, descripcion: 'Pago con tarjeta crédito', comisionPorcentaje: 2.5, activo: true },
      { nombre: 'Transferencia Bancaria', tipo: TipoMetodo.TRANSFERENCIA, descripcion: 'Transferencia PSE o bancaria', comisionPorcentaje: 0, activo: true },
      { nombre: 'Nequi', tipo: TipoMetodo.NEQUI, descripcion: 'Pago móvil Nequi', comisionPorcentaje: 0, activo: true },
      { nombre: 'Daviplata', tipo: TipoMetodo.DAVIPLATA, descripcion: 'Pago móvil Daviplata', comisionPorcentaje: 0, activo: true },
      { nombre: 'PayPal', tipo: TipoMetodo.PAYPAL, descripcion: 'Pago con PayPal', comisionPorcentaje: 3.5, activo: true },
      { nombre: 'Mercado Pago', tipo: TipoMetodo.MERCADO_PAGO, descripcion: 'Pago con Mercado Pago', comisionPorcentaje: 4.5, activo: true },
      { nombre: 'QR', tipo: TipoMetodo.QR, descripcion: 'Pago con código QR', comisionPorcentaje: 1.0, activo: true },
      { nombre: 'Contra Entrega', tipo: TipoMetodo.CONTRA_ENTREGA, descripcion: 'Pago al recibir el producto', comisionPorcentaje: 0, activo: true },
      { nombre: 'Pago Mixto', tipo: TipoMetodo.MIXTO, descripcion: 'Combinación de varios métodos de pago', comisionPorcentaje: 0, activo: true },
    ];

    for (const metodo of metodosPorDefecto) {
      const existe = await this.metodoPagoRepository.findOne({ where: { tipo: metodo.tipo } });
      if (!existe) {
        const nuevo = this.metodoPagoRepository.create(metodo);
        await this.metodoPagoRepository.save(nuevo);
      }
    }
  }

  async findAll(): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find({
      where: { estado: EstadoMetodoPago.ACTIVO },
      order: { nombre: 'ASC' },
    });
  }

  async findAllAdmin(): Promise<MetodoPago[]> {
    return this.metodoPagoRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<MetodoPago> {
    const metodo = await this.metodoPagoRepository.findOne({ where: { id } });
    if (!metodo) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    }
    return metodo;
  }

  async findByTipo(tipo: TipoMetodo): Promise<MetodoPago> {
    const metodo = await this.metodoPagoRepository.findOne({ where: { tipo } });
    if (!metodo) {
      throw new NotFoundException(`Método de pago tipo ${tipo} no encontrado`);
    }
    return metodo;
  }

  async update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto): Promise<MetodoPago> {
    const metodo = await this.findOne(id);
    Object.assign(metodo, updateMetodoPagoDto);
    return this.metodoPagoRepository.save(metodo);
  }

  async remove(id: number): Promise<void> {
    const metodo = await this.findOne(id);
    metodo.estado = EstadoMetodoPago.INACTIVO;
    await this.metodoPagoRepository.save(metodo);
  }

  async activar(id: number): Promise<MetodoPago> {
    const metodo = await this.findOne(id);
    metodo.estado = EstadoMetodoPago.ACTIVO;
    metodo.activo = true;
    return this.metodoPagoRepository.save(metodo);
  }

  async calcularComision(metodoId: number, monto: number): Promise<{ comision: number; total: number }> {
    const metodo = await this.findOne(metodoId);
    const comision = (monto * Number(metodo.comisionPorcentaje)) / 100 + Number(metodo.comisionFija);
    return { comision, total: monto - comision };
  }
}