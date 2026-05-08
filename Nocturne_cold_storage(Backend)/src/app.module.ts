import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { VentasModule } from './ventas/ventas.module';
import { DetallesVentaModule } from './detalles-venta/detalles-venta.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ProductosModule, CategoriasModule, ProveedoresModule, InventariosModule, VentasModule, DetallesVentaModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
