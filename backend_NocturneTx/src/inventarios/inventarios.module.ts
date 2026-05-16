import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';
import { Inventario } from './entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario])],
  controllers: [InventariosController],
  providers: [InventariosService],
  exports: [InventariosService],
})
export class InventariosModule {}