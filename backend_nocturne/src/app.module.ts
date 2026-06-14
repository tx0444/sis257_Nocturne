import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entidades
import { Rol } from './roles/entities/rol.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { Marca } from './marcas/entities/marca.entity';
import { Proveedor } from './proveedores/entities/proveedor.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Producto } from './productos/entities/producto.entity';
import { Compra } from './compras/entities/compra.entity';
import { DetalleCompra } from './detalles-compra/entities/detalle-compra.entity';
import { Venta } from './ventas/entities/venta.entity';
import { DetalleVenta } from './detalles-venta/entities/detalle-venta.entity';
import { MetodoPago } from './metodos-pago/entities/metodo-pago.entity';
import { Pago } from './pagos/entities/pago.entity';
import { Auditoria } from './auditoria/entities/auditoria.entity';
import { Promocion } from './promociones/entities/promocion.entity';
import { ComboProducto } from './productos/entities/combo-producto.entity';
import { Delivery } from './ventas/entities/delivery.entity';
import { Caja } from './cajas/entities/caja.entity';

// Módulos
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { ComprasModule } from './compras/compras.module';
import { VentasModule } from './ventas/ventas.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeders/seeder.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { PromocionesModule } from './promociones/promociones.module';
import { CajasModule } from './cajas/cajas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'sis257_lafortaleza',
      entities: [
        Rol, Usuario, Categoria, Marca, Proveedor, Cliente,
        Producto, Compra, DetalleCompra, Venta, DetalleVenta,
        MetodoPago, Pago, Auditoria, Promocion, ComboProducto, Delivery, Caja,
      ],
      synchronize: true, // Solo para desarrollo
      logging: false,
      ssl: process.env.DB_SSL === 'true' || process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    }),
    // Módulos del sistema
    RolesModule,
    UsuariosModule,
    CategoriasModule,
    MarcasModule,
    ProveedoresModule,
    ClientesModule,
    ProductosModule,
    ComprasModule,
    VentasModule,
    MetodosPagoModule,
    AuthModule,
    SeederModule,
    AuditoriaModule,
    PromocionesModule,
    CajasModule,
  ],
})
export class AppModule {}
