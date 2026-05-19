import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Categoria, Producto])],
  providers: [SeedService],
})
export class SeedModule {}
