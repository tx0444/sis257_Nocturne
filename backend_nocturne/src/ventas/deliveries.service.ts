import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery, EstadoDelivery } from './entities/delivery.entity';
import { Venta } from './entities/venta.entity';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.find({
      relations: ['venta', 'venta.cliente', 'venta.usuario', 'venta.detalles', 'venta.detalles.producto'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: ['venta', 'venta.cliente', 'venta.usuario', 'venta.detalles', 'venta.detalles.producto'],
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery con ID ${id} no encontrado`);
    }
    return delivery;
  }

  async findByVenta(ventaId: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { ventaId },
      relations: ['venta', 'venta.cliente', 'venta.usuario', 'venta.detalles', 'venta.detalles.producto'],
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery para la venta #${ventaId} no encontrado`);
    }
    return delivery;
  }

  async updateEstado(id: number, estado: EstadoDelivery, usuarioAutenticado: Usuario | null = null): Promise<Delivery> {
    const delivery = await this.findOne(id);
    const estadoAnterior = delivery.estado;
    
    delivery.estado = estado;
    
    if (estado === 'Entregado') {
      delivery.fechaEntrega = new Date();
      
      // Si el delivery está entregado, también actualizamos el estado de la venta a 'Entregada'
      if (delivery.venta) {
        delivery.venta.estado = 'Entregada';
        await this.ventaRepository.save(delivery.venta);
      }
    } else if (estado === 'Cancelado') {
      // Si se cancela el delivery, anulamos la venta correspondiente
      if (delivery.venta) {
        delivery.venta.estado = 'Anulada';
        await this.ventaRepository.save(delivery.venta);
      }
    }
    
    const updated = await this.deliveryRepository.save(delivery);

    // Auditoría
    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'EDITAR',
      'VENTAS',
      delivery.ventaId,
      `Se cambió el estado del delivery #${id} de la venta #${delivery.ventaId} de "${estadoAnterior}" a "${estado}".`,
    );

    return updated;
  }
}
