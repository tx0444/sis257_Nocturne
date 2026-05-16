import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { PromocionesModule } from './promociones/promociones.module';

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
import { Boveda } from './bovedas/entities/boveda.entity';
import { Tasacion } from './tasaciones/entities/tasacion.entity';
import { EnvioSeguro } from './envios-seguros/entities/envio-seguro.entity';
import { AlertaSeguridad } from './alertas-seguridad/entities/alertas-seguridad.entity';
import { Promocion } from './promociones/entities/promocion.entity';
import { BovedasModule } from './bovedas/bovedas.module';
import { TasacionesModule } from './tasaciones/tasaciones.module';
import { EnviosSegurosModule } from './envios-seguros/envios-seguros.module';
import { AlertasSeguridadModule } from './alertas-seguridad/alertas-seguridad.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';
import { MetodoPago } from './metodos-pago/entities/metodo-pago.entity';
import { Factura } from './facturas/entities/factura.entity';
import { DetalleFactura } from './facturas/entities/detalle-factura.entity';
import { FacturasModule } from './facturas/facturas.module';

// Nuevos módulos de funcionalidades
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { CarritoModule } from './carrito/carrito.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { CarritoItem } from './carrito/entities/carrito-item.entity';
import { Direccion } from './direcciones/entities/direccion.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.Nocturn',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'usr_nocturnetx'),
        password: configService.get<string>('DB_PASSWORD', '123456'),
        database: configService.get<string>('DB_NAME', 'sis257_nocturne'),
        ssl: false,
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
          Boveda,
          Tasacion,
          EnvioSeguro,
          AlertaSeguridad,
          Promocion,
          MetodoPago,
          Factura,
          DetalleFactura,
          CarritoItem,
          Direccion,
        ],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
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
    BovedasModule,
    TasacionesModule,
    EnviosSegurosModule,
    AlertasSeguridadModule,
    MetodosPagoModule,
    FacturasModule,
    PromocionesModule,
    CarritoModule,
    DireccionesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}