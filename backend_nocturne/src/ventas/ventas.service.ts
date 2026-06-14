import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta, EstadoVenta } from './entities/venta.entity';
import { DetalleVenta } from '../detalles-venta/entities/detalle-venta.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { ComboProducto } from '../productos/entities/combo-producto.entity';
import { Delivery } from './entities/delivery.entity';
import { Caja } from '../cajas/entities/caja.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private readonly detalleVentaRepository: Repository<DetalleVenta>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly dataSource: DataSource,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  /**
   * Busca o crea el cliente "Consumidor Final" con CI/NIT "0"
   * Se usa cuando no se especifica clienteId en la venta.
   */
  private async getConsumidorFinal(manager: any): Promise<Cliente> {
    let consumidor = await manager.findOne(Cliente, {
      where: { ciNit: '0', nombre: 'Cliente', apellido: 'Ocasional' },
    });
    if (!consumidor) {
      consumidor = manager.create(Cliente, {
        nombre: 'Cliente',
        apellido: 'Ocasional',
        ciNit: '0',
        estado: true,
      });
      consumidor = await manager.save(consumidor);
    }
    return consumidor;
  }

  async create(createVentaDto: CreateVentaDto, usuarioAutenticado: Usuario | null = null): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        detalles,
        pagos,
        clienteId,
        comprobanteQr,
        tipoEntrega,
        direccion,
        referencia,
        telefonoContacto,
        costoDelivery,
        latitud,
        longitud,
        ...ventaData
      } = createVentaDto;

      // Resolver cliente: si no se provee clienteId, usar Consumidor Final
      let resolvedClienteId: number;
      if (clienteId) {
        resolvedClienteId = clienteId;
      } else {
        const consumidor = await this.getConsumidorFinal(queryRunner.manager);
        resolvedClienteId = consumidor.id;
      }

      // Buscar caja activa para el usuario autenticado
      let resolvedCajaId: number | null = null;
      if (usuarioAutenticado) {
        const activeCaja = await queryRunner.manager.findOne(Caja, {
          where: { usuarioId: usuarioAutenticado.id, estado: 'Abierta' },
        });
        if (activeCaja) {
          resolvedCajaId = activeCaja.id;
        }
      }

      // Validar stock y calcular total
      let total = 0;
      for (const det of detalles) {
        const producto = await queryRunner.manager.findOne(Producto, {
          where: { id: det.productoId },
        });
        if (!producto) {
          throw new NotFoundException(`Producto con ID ${det.productoId} no encontrado`);
        }

        if (producto.esCombo) {
          // Validar subproductos (soportando componentes personalizados enviados desde el frontend)
          const comboItems = det.componentes && det.componentes.length > 0
            ? det.componentes
            : await queryRunner.manager.find(ComboProducto, {
                where: { comboId: producto.id }
              });
          if (comboItems.length === 0) {
            throw new BadRequestException(`El combo "${producto.nombre}" no tiene productos asociados.`);
          }
          for (const item of comboItems) {
            const subProduct = await queryRunner.manager.findOne(Producto, {
              where: { id: item.productoId }
            });
            if (!subProduct) {
              throw new NotFoundException(`Subproducto con ID ${item.productoId} del combo no encontrado`);
            }
            const subUnidadesAComprar = item.cantidad * det.cantidad;
            if (Number(subProduct.stock) < subUnidadesAComprar) {
              throw new BadRequestException(
                `Stock insuficiente para el componente "${subProduct.nombre}" del combo "${producto.nombre}". Disponible: ${subProduct.stock}, Requerido: ${subUnidadesAComprar}`
              );
            }
          }
        } else {
          // Validar producto base
          const tipoVenta = det.tipoVenta || 'Unidad';
          const unidadesPorCaja = producto.unidadesPorCaja || 1;
          const unidadesAComprar = tipoVenta === 'Caja' ? det.cantidad * unidadesPorCaja : det.cantidad;

          if (Number(producto.stock) < unidadesAComprar) {
            throw new BadRequestException(
              `Stock insuficiente para "${producto.nombre}". Disponible: ${producto.stock}, Solicitado: ${unidadesAComprar} (en ${tipoVenta}s)`,
            );
          }
        }
        total += det.cantidad * det.precio;
      }

      // Crear venta
      const venta = queryRunner.manager.create(Venta, {
        ...ventaData,
        clienteId: resolvedClienteId,
        total,
        fecha: new Date(),
        estado: (ventaData.estado as EstadoVenta) || 'Confirmada',
        comprobanteQr: comprobanteQr || undefined,
        tipoEntrega: tipoEntrega || 'Tienda',
        direccionEntrega: tipoEntrega === 'Delivery' ? (direccion || undefined) : undefined,
        cajaId: resolvedCajaId,
      });
      const savedVenta = await queryRunner.manager.save(venta);

      // Crear delivery si corresponde
      if (tipoEntrega === 'Delivery') {
        const delivery = queryRunner.manager.create(Delivery, {
          ventaId: savedVenta.id,
          direccion: direccion || 'Sin dirección',
          referencia: referencia || undefined,
          telefonoContacto: telefonoContacto || '00000000',
          costoDelivery: costoDelivery !== undefined ? costoDelivery : 10.00,
          latitud: latitud || null,
          longitud: longitud || null,
          estado: 'Pendiente',
        });
        await queryRunner.manager.save(delivery);
      }

      // Crear detalles y descontar stock
      for (const det of detalles) {
        const subtotal = det.cantidad * det.precio;
        const detalle = queryRunner.manager.create(DetalleVenta, {
          ventaId: savedVenta.id,
          productoId: det.productoId,
          cantidad: det.cantidad,
          precio: det.precio,
          subtotal,
          tipoVenta: det.tipoVenta || 'Unidad',
          conHielo: det.conHielo || false,
        });
        await queryRunner.manager.save(detalle);

        // Descontar stock
        const producto = await queryRunner.manager.findOne(Producto, {
          where: { id: det.productoId },
        });

        if (producto!.esCombo) {
          // Descontar de subproductos
          const comboItems = det.componentes && det.componentes.length > 0
            ? det.componentes
            : await queryRunner.manager.find(ComboProducto, {
                where: { comboId: producto!.id }
              });
          for (const item of comboItems) {
            const subProduct = await queryRunner.manager.findOne(Producto, {
              where: { id: item.productoId }
            });
            if (subProduct) {
              const subUnidadesARestar = item.cantidad * det.cantidad;
              subProduct.stock = Number(subProduct.stock) - subUnidadesARestar;
              await queryRunner.manager.save(subProduct);
            }
          }
          // También descontamos del combo en sí para mantener coherencia si se muestra stock del combo
          producto!.stock = Number(producto!.stock) - det.cantidad;
          await queryRunner.manager.save(producto!);
        } else {
          // Descontar del producto base
          const tipoVenta = det.tipoVenta || 'Unidad';
          const unidadesPorCaja = producto!.unidadesPorCaja || 1;
          const unidadesARestar = tipoVenta === 'Caja' ? det.cantidad * unidadesPorCaja : det.cantidad;

          producto!.stock = Number(producto!.stock) - unidadesARestar;
          await queryRunner.manager.save(producto!);
        }
      }

      // Registrar pagos
      for (const pago of pagos) {
        const pagoEntity = queryRunner.manager.create(Pago, {
          ventaId: savedVenta.id,
          metodoPagoId: pago.metodoPagoId,
          monto: pago.monto,
          montoRecibido: pago.montoRecibido || pago.monto,
          cambio: pago.cambio || 0,
          fecha: new Date(),
        });
        await queryRunner.manager.save(pagoEntity);
      }

      await queryRunner.commitTransaction();

      // Registrar en la auditoría
      const totalDetallesStr = detalles.map(d => `ProdID: ${d.productoId} (Cant: ${d.cantidad})`).join(', ');
      await this.auditoriaService.registrar(
        usuarioAutenticado,
        'CREAR',
        'VENTAS',
        savedVenta.id,
        `Se registró la venta #${savedVenta.id} por un total de Bs. ${total.toFixed(2)}. ClienteID: ${resolvedClienteId}. Detalles: [${totalDetallesStr}]`,
      );

      return this.findOne(savedVenta.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({
      relations: ['cliente', 'usuario', 'detalles', 'detalles.producto', 'pagos', 'pagos.metodoPago'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['cliente', 'usuario', 'detalles', 'detalles.producto', 'pagos', 'pagos.metodoPago'],
    });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }

  /**
   * Cambia el estado de una venta (Pendiente -> Confirmada -> Entregada | Anulada)
   */
  async cambiarEstado(id: number, estado: EstadoVenta, usuarioAutenticado: Usuario | null = null): Promise<Venta> {
    const venta = await this.findOne(id);
    const estadoAnterior = venta.estado;
    venta.estado = estado;
    const updated = await this.ventaRepository.save(venta);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'EDITAR',
      'VENTAS',
      id,
      `Se cambió el estado de la venta #${id} de "${estadoAnterior}" a "${estado}".`,
    );

    return updated;
  }

  /**
   * Actualiza el comprobante QR de una venta
   */
  async actualizarComprobante(id: number, comprobanteQr: string, usuarioAutenticado: Usuario | null = null): Promise<Venta> {
    const venta = await this.findOne(id);
    venta.comprobanteQr = comprobanteQr;
    const updated = await this.ventaRepository.save(venta);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'EDITAR',
      'VENTAS',
      id,
      `Se adjuntó comprobante QR a la venta #${id}: ${comprobanteQr}`,
    );

    return updated;
  }

  async remove(id: number, usuarioAutenticado: Usuario | null = null): Promise<void> {
    const venta = await this.findOne(id);
    await this.ventaRepository.softRemove(venta);

    await this.auditoriaService.registrar(
      usuarioAutenticado,
      'ELIMINAR',
      'VENTAS',
      id,
      `Se anuló/eliminó la venta #${id} con un total de Bs. ${Number(venta.total).toFixed(2)}. Cliente: ${venta.cliente?.nombre || 'N/A'} ${venta.cliente?.apellido || 'N/A'}.`,
    );
  }
}
