import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Promocion } from './entities/promocion.entity';
import { Producto } from '../productos/entities/producto.entity';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepo: Repository<Promocion>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(createPromocionDto: CreatePromocionDto): Promise<Promocion> {
    const { productoIds, ...promoData } = createPromocionDto;
    const promocion = this.promocionRepo.create(promoData);
    const saved = await this.promocionRepo.save(promocion);

    if (productoIds && productoIds.length > 0) {
      await this.productoRepo.update({ id: In(productoIds) }, { promocionId: saved.id });
    }

    return this.findOne(saved.id);
  }

  async findAll(): Promise<Promocion[]> {
    return this.promocionRepo.find({
      relations: ['productos'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Promocion> {
    const promocion = await this.promocionRepo.findOne({
      where: { id },
      relations: ['productos'],
    });
    if (!promocion) {
      throw new NotFoundException(`Promoción con ID ${id} no encontrada`);
    }
    return promocion;
  }

  async update(id: number, updatePromocionDto: UpdatePromocionDto): Promise<Promocion> {
    const promocion = await this.findOne(id);
    const { productoIds, ...promoData } = updatePromocionDto;

    Object.assign(promocion, promoData);
    const saved = await this.promocionRepo.save(promocion);

    if (productoIds !== undefined) {
      // Reset old products belonging to this promo
      await this.productoRepo.update({ promocionId: id }, { promocionId: null });
      // Apply to new products
      if (productoIds.length > 0) {
        await this.productoRepo.update({ id: In(productoIds) }, { promocionId: id });
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const promocion = await this.findOne(id);
    await this.promocionRepo.softRemove(promocion);
  }
}
