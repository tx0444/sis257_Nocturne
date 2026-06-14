import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Rol } from '../roles/entities/rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Producto } from '../productos/entities/producto.entity';
import { MetodoPago } from '../metodos-pago/entities/metodo-pago.entity';
import { ComboProducto } from '../productos/entities/combo-producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol, Usuario, Categoria, Marca, Proveedor, Cliente, Producto, MetodoPago, ComboProducto]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
