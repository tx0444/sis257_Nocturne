import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caja } from './entities/caja.entity';
import { Venta } from '../ventas/entities/venta.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class CajasService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async findActive(usuarioId: number): Promise<Caja | null> {
    return this.cajaRepository.findOne({
      where: { usuarioId, estado: 'Abierta' },
    });
  }

  async findActiveOrThrow(usuarioId: number): Promise<Caja> {
    const active = await this.findActive(usuarioId);
    if (!active) {
      throw new BadRequestException('No tienes una caja abierta activa en este momento.');
    }
    return active;
  }

  async abrir(usuarioId: number, montoInicial: number, usuarioAutenticado: Usuario | null = null): Promise<Caja> {
    const active = await this.findActive(usuarioId);
    if (active) {
      throw new BadRequestException('Ya tienes una caja abierta activa. Debes cerrarla primero.');
    }

    const nuevaCaja = this.cajaRepository.create({
      usuarioId,
      montoInicial,
      estado: 'Abierta',
      fechaApertura: new Date(),
    });

    const saved = await this.cajaRepository.save(nuevaCaja);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'CREAR',
      'CLIENTES', // usando Clientes o modulo genérico de caja
      saved.id,
      `Apertura de caja #${saved.id} con monto inicial de Bs. ${montoInicial.toFixed(2)}`,
    );

    return saved;
  }

  async obtenerResumenActual(cajaId: number): Promise<{
    ventasEfectivo: number;
    ventasQr: number;
    ventasTarjeta: number;
    totalVentas: number;
  }> {
    // Buscar todas las ventas asociadas a esta caja
    const ventas = await this.ventaRepository.find({
      where: { cajaId },
      relations: ['pagos', 'pagos.metodoPago'],
    });

    let ventasEfectivo = 0;
    let ventasQr = 0;
    let ventasTarjeta = 0;

    for (const v of ventas) {
      if (v.estado === 'Anulada') continue;
      for (const p of v.pagos) {
        const metodo = p.metodoPago?.nombre?.toLowerCase() || '';
        if (metodo.includes('efectivo')) {
          ventasEfectivo += Number(p.monto);
        } else if (metodo.includes('qr')) {
          ventasQr += Number(p.monto);
        } else if (metodo.includes('tarjeta')) {
          ventasTarjeta += Number(p.monto);
        } else {
          // Si es transferencia u otro, sumamos a QR o Tarjeta o lo clasificamos
          ventasQr += Number(p.monto);
        }
      }
    }

    return {
      ventasEfectivo,
      ventasQr,
      ventasTarjeta,
      totalVentas: ventasEfectivo + ventasQr + ventasTarjeta,
    };
  }

  async cerrar(usuarioId: number, montoFinalReportado: number, usuarioAutenticado: Usuario | null = null): Promise<Caja> {
    const caja = await this.findActiveOrThrow(usuarioId);

    const resumen = await this.obtenerResumenActual(caja.id);

    caja.ventasEfectivo = resumen.ventasEfectivo;
    caja.ventasQr = resumen.ventasQr;
    caja.ventasTarjeta = resumen.ventasTarjeta;
    
    // El efectivo total esperado en caja es el monto inicial + ventas en efectivo
    caja.totalCaja = Number(caja.montoInicial) + resumen.ventasEfectivo;
    caja.montoFinal = montoFinalReportado;
    caja.diferencia = montoFinalReportado - caja.totalCaja;
    
    caja.estado = 'Cerrada';
    caja.fechaCierre = new Date();

    const saved = await this.cajaRepository.save(caja);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'EDITAR',
      'CLIENTES',
      saved.id,
      `Cierre de caja #${saved.id}. Ventas Efectivo: ${resumen.ventasEfectivo}, QR: ${resumen.ventasQr}, Tarjeta: ${resumen.ventasTarjeta}. Diferencia: ${caja.diferencia.toFixed(2)}`,
    );

    return saved;
  }

  async findAll(): Promise<Caja[]> {
    return this.cajaRepository.find({
      relations: ['usuario'],
      order: { fechaApertura: 'DESC' },
    });
  }
}
