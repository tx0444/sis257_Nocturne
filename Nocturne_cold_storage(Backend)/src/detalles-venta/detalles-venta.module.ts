import { Module } from '@nestjs/common';
import { DetallesVentaService } from './detalles-venta.service';
import { DetallesVentaController } from './detalles-venta.controller';

@Module({
  controllers: [DetallesVentaController],
  providers: [DetallesVentaService],
})
export class DetallesVentaModule {}
