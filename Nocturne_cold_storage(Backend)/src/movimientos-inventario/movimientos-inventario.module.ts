import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientosInventarioService } from './movimientos-inventario.service';
import { MovimientosInventarioController } from './movimientos-inventario.controller';
import { MovimientoInventario } from './entities/movimiento-inventario.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoInventario, Inventario])],
  controllers: [MovimientosInventarioController],
  providers: [MovimientosInventarioService],
  exports: [MovimientosInventarioService],
})
export class MovimientosInventarioModule {}