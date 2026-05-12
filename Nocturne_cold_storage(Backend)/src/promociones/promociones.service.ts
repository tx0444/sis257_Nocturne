import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Promocion, TipoDescuento } from './entities/promocion.entity';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepository: Repository<Promocion>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createPromocionDto: CreatePromocionDto): Promise<Promocion> {
    const nuevaPromocion = this.promocionRepository.create(createPromocionDto);
    return await this.promocionRepository.save(nuevaPromocion);
  }

  async findAll(): Promise<Promocion[]> {
    return await this.promocionRepository.find({
      relations: ['categoria', 'producto'],
    });
  }

  async findOne(id: number): Promise<Promocion> {
    const promocion = await this.promocionRepository.findOne({
      where: { id },
      relations: ['categoria', 'producto'],
    });
    if (!promocion) {
      throw new NotFoundException(`Promoción con ID ${id} no encontrada`);
    }
    return promocion;
  }

  async update(id: number, updatePromocionDto: UpdatePromocionDto): Promise<Promocion> {
    const promocion = await this.findOne(id);
    const actual = Object.assign(promocion, updatePromocionDto);
    return await this.promocionRepository.save(actual);
  }

  async remove(id: number): Promise<void> {
    const promocion = await this.findOne(id);
    await this.promocionRepository.remove(promocion);
  }

  // Lógica para calcular descuento de una lista de productos
  async calcularDescuentos(items: { productoId: number; cantidad: number }[]) {
    const fechaActual = new Date();
    
    // Obtener todas las promociones activas en la fecha actual
    const promocionesActivas = await this.promocionRepository.find({
      where: {
        activa: true,
        fechaInicio: LessThanOrEqual(fechaActual),
        fechaFin: MoreThanOrEqual(fechaActual),
      },
    });

    let subtotalGeneral = 0;
    let descuentoTotalGeneral = 0;
    const detalles: any[] = [];

    for (const item of items) {
      const producto = await this.productoRepository.findOne({
        where: { id: item.productoId },
        relations: ['categoria'],
      });

      if (!producto) continue;

      const subtotalBase = Number(producto.precioVenta) * item.cantidad;
      let mejorDescuentoUnitario = 0;

      // Buscar promociones aplicables al producto o a su categoría
      const promocionesAplicables = promocionesActivas.filter(p => 
        p.productoId === producto.id || p.categoriaId === producto.categoriaId
      );

      // Calcular el mejor descuento para este producto
      for (const promo of promocionesAplicables) {
        let descuentoCalculado = 0;
        if (promo.tipoDescuento === TipoDescuento.PORCENTAJE) {
          descuentoCalculado = Number(producto.precioVenta) * (Number(promo.valorDescuento) / 100);
        } else if (promo.tipoDescuento === TipoDescuento.MONTO_FIJO) {
          descuentoCalculado = Number(promo.valorDescuento);
        }
        
        if (descuentoCalculado > mejorDescuentoUnitario) {
          mejorDescuentoUnitario = descuentoCalculado;
        }
      }

      // Asegurar que el descuento no supere el precio del producto
      if (mejorDescuentoUnitario > Number(producto.precioVenta)) {
        mejorDescuentoUnitario = Number(producto.precioVenta);
      }

      const descuentoTotalProductoBs = mejorDescuentoUnitario * item.cantidad;
      const subtotalConDescuentoBs = subtotalBase - descuentoTotalProductoBs;

      subtotalGeneral += subtotalBase;
      descuentoTotalGeneral += descuentoTotalProductoBs;

      detalles.push({
        productoId: producto.id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precioUnitarioBs: Number(producto.precioVenta),
        subtotalBaseBs: subtotalBase,
        descuentoAplicadoBs: descuentoTotalProductoBs,
        subtotalFinalBs: subtotalConDescuentoBs,
      });
    }

    return {
      subtotalOriginalBs: subtotalGeneral,
      descuentoTotalBs: descuentoTotalGeneral,
      totalFinalBs: subtotalGeneral - descuentoTotalGeneral,
      detalles,
    };
  }
}
