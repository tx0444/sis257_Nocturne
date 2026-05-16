"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const productos_module_1 = require("./productos/productos.module");
const categorias_module_1 = require("./categorias/categorias.module");
const proveedores_module_1 = require("./proveedores/proveedores.module");
const inventarios_module_1 = require("./inventarios/inventarios.module");
const ventas_module_1 = require("./ventas/ventas.module");
const detalles_venta_module_1 = require("./detalles-venta/detalles-venta.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const clientes_module_1 = require("./clientes/clientes.module");
const roles_module_1 = require("./roles/roles.module");
const bitacoras_module_1 = require("./bitacoras/bitacoras.module");
const movimientos_inventario_module_1 = require("./movimientos-inventario/movimientos-inventario.module");
const promociones_module_1 = require("./promociones/promociones.module");
const categorias_entity_1 = require("./categorias/entities/categorias.entity");
const producto_entity_1 = require("./productos/entities/producto.entity");
const proveedor_entity_1 = require("./proveedores/entities/proveedor.entity");
const inventario_entity_1 = require("./inventarios/entities/inventario.entity");
const venta_entity_1 = require("./ventas/entities/venta.entity");
const detalle_venta_entity_1 = require("./detalles-venta/entities/detalle-venta.entity");
const usuario_entity_1 = require("./usuarios/entities/usuario.entity");
const cliente_entity_1 = require("./clientes/entities/cliente.entity");
const rol_entity_1 = require("./roles/entities/rol.entity");
const bitacora_entity_1 = require("./bitacoras/entities/bitacora.entity");
const movimiento_inventario_entity_1 = require("./movimientos-inventario/entities/movimiento-inventario.entity");
const boveda_entity_1 = require("./bovedas/entities/boveda.entity");
const tasacion_entity_1 = require("./tasaciones/entities/tasacion.entity");
const envio_seguro_entity_1 = require("./envios-seguros/entities/envio-seguro.entity");
const alertas_seguridad_entity_1 = require("./alertas-seguridad/entities/alertas-seguridad.entity");
const promocion_entity_1 = require("./promociones/entities/promocion.entity");
const bovedas_module_1 = require("./bovedas/bovedas.module");
const tasaciones_module_1 = require("./tasaciones/tasaciones.module");
const envios_seguros_module_1 = require("./envios-seguros/envios-seguros.module");
const alertas_seguridad_module_1 = require("./alertas-seguridad/alertas-seguridad.module");
const metodos_pago_module_1 = require("./metodos-pago/metodos-pago.module");
const metodo_pago_entity_1 = require("./metodos-pago/entities/metodo-pago.entity");
const factura_entity_1 = require("./facturas/entities/factura.entity");
const detalle_factura_entity_1 = require("./facturas/entities/detalle-factura.entity");
const facturas_module_1 = require("./facturas/facturas.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const carrito_module_1 = require("./carrito/carrito.module");
const direcciones_module_1 = require("./direcciones/direcciones.module");
const carrito_item_entity_1 = require("./carrito/entities/carrito-item.entity");
const direccion_entity_1 = require("./direcciones/entities/direccion.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env.Nocturn',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'usr_nocturnetx'),
                    password: configService.get('DB_PASSWORD', '123456'),
                    database: configService.get('DB_NAME', 'sis257_nocturne'),
                    ssl: false,
                    entities: [
                        categorias_entity_1.Categoria,
                        producto_entity_1.Producto,
                        proveedor_entity_1.Proveedor,
                        inventario_entity_1.Inventario,
                        venta_entity_1.Venta,
                        detalle_venta_entity_1.DetalleVenta,
                        usuario_entity_1.Usuario,
                        cliente_entity_1.Cliente,
                        rol_entity_1.Rol,
                        bitacora_entity_1.Bitacora,
                        movimiento_inventario_entity_1.MovimientoInventario,
                        boveda_entity_1.Boveda,
                        tasacion_entity_1.Tasacion,
                        envio_seguro_entity_1.EnvioSeguro,
                        alertas_seguridad_entity_1.AlertaSeguridad,
                        promocion_entity_1.Promocion,
                        metodo_pago_entity_1.MetodoPago,
                        factura_entity_1.Factura,
                        detalle_factura_entity_1.DetalleFactura,
                        carrito_item_entity_1.CarritoItem,
                        direccion_entity_1.Direccion,
                    ],
                    synchronize: true,
                    logging: false,
                }),
                inject: [config_1.ConfigService],
            }),
            categorias_module_1.CategoriasModule,
            productos_module_1.ProductosModule,
            proveedores_module_1.ProveedoresModule,
            inventarios_module_1.InventariosModule,
            clientes_module_1.ClientesModule,
            ventas_module_1.VentasModule,
            detalles_venta_module_1.DetallesVentaModule,
            usuarios_module_1.UsuariosModule,
            roles_module_1.RolesModule,
            bitacoras_module_1.BitacorasModule,
            movimientos_inventario_module_1.MovimientosInventarioModule,
            bovedas_module_1.BovedasModule,
            tasaciones_module_1.TasacionesModule,
            envios_seguros_module_1.EnviosSegurosModule,
            alertas_seguridad_module_1.AlertasSeguridadModule,
            metodos_pago_module_1.MetodosPagoModule,
            facturas_module_1.FacturasModule,
            promociones_module_1.PromocionesModule,
            carrito_module_1.CarritoModule,
            direcciones_module_1.DireccionesModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map