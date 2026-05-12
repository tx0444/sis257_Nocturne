import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { Factura } from './entities/factura.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, DetalleFactura])],
  controllers: [FacturasController],
  providers: [FacturasService],
  exports: [FacturasService],
})
export class FacturasModule {}