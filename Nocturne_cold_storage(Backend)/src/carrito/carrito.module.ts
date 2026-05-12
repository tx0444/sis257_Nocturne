import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { CarritoItem } from './entities/carrito-item.entity';
import { Producto } from '../productos/entities/producto.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarritoItem, Producto]),
    AuthModule,
  ],
  controllers: [CarritoController],
  providers: [CarritoService],
  exports: [CarritoService],
})
export class CarritoModule {}