import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesVentaService } from './detalles-venta.service';
import { DetallesVentaController } from './detalles-venta.controller';
import { DetalleVenta } from './entities/detalle-venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  controllers: [DetallesVentaController],
  providers: [DetallesVentaService],
  exports: [DetallesVentaService],
})
export class DetallesVentaModule {}