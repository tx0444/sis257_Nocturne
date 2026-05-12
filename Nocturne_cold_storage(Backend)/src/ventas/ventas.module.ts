import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalles-venta/entities/detalle-venta.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';
import { MovimientosInventarioModule } from '../movimientos-inventario/movimientos-inventario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta, DetalleVenta, Inventario]),
    MovimientosInventarioModule,
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}