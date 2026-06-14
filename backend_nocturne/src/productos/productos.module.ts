import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { ComboProducto } from './entities/combo-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, ComboProducto])],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService, TypeOrmModule.forFeature([Producto, ComboProducto])],
})
export class ProductosModule {}
