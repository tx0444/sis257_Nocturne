import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos existentes
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { VentasModule } from './ventas/ventas.module';
import { DetallesVentaModule } from './detalles-venta/detalles-venta.module';
import { UsuariosModule } from './usuarios/usuarios.module';

// Nuevos módulos
import { ClientesModule } from './clientes/clientes.module';
import { RolesModule } from './roles/roles.module';
import { BitacorasModule } from './bitacoras/bitacoras.module';
import { MovimientosInventarioModule } from './movimientos-inventario/movimientos-inventario.module';
import { AuthModule } from './auth/auth.module';

// Entidades
import { Categoria } from './categorias/entities/categorias.entity';
import { Producto } from './productos/entities/producto.entity';
import { Proveedor } from './proveedores/entities/proveedor.entity';
import { Inventario } from './inventarios/entities/inventario.entity';
import { Venta } from './ventas/entities/venta.entity';
import { DetalleVenta } from './detalles-venta/entities/detalle-venta.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Rol } from './roles/entities/rol.entity';
import { Bitacora } from './bitacoras/entities/bitacora.entity';
import { MovimientoInventario } from './movimientos-inventario/entities/movimiento-inventario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'usr_nocturne',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'nocturne_db',
      entities: [
        Categoria,
        Producto,
        Proveedor,
        Inventario,
        Venta,
        DetalleVenta,
        Usuario,
        Cliente,
        Rol,
        Bitacora,
        MovimientoInventario,
      ],
      synchronize: true, // ⚠️ Solo para desarrollo
      logging: false,
    }),
    // Módulos del sistema
    CategoriasModule,
    ProductosModule,
    ProveedoresModule,
    InventariosModule,
    ClientesModule,
    VentasModule,
    DetallesVentaModule,
    UsuariosModule,
    RolesModule,
    BitacorasModule,
    MovimientosInventarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}