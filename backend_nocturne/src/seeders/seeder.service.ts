import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../roles/entities/rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Producto } from '../productos/entities/producto.entity';
import { MetodoPago } from '../metodos-pago/entities/metodo-pago.entity';
import { ComboProducto } from '../productos/entities/combo-producto.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Rol) private rolRepo: Repository<Rol>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>,
    @InjectRepository(Marca) private marcaRepo: Repository<Marca>,
    @InjectRepository(Proveedor) private proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    @InjectRepository(MetodoPago) private metodoPagoRepo: Repository<MetodoPago>,
    @InjectRepository(ComboProducto) private comboProductoRepo: Repository<ComboProducto>,
  ) {}

  async onModuleInit() {
    await this.seed();
    await this.migrateProductPricing();
    await this.updateCategoryImages();
  }

  async migrateProductPricing() {
    try {
      console.log('Verificando y migrando precios de productos...');
      const productos = await this.productoRepo.find();
      for (const p of productos) {
        let changed = false;

        if (p.vendePorUnidad === undefined || p.vendePorUnidad === null) {
          p.vendePorUnidad = true;
          changed = true;
        }

        if (p.vendePorCaja === undefined || p.vendePorCaja === null) {
          p.vendePorCaja = true;
          changed = true;
        }

        if (!p.unidadesPorCaja) {
          p.unidadesPorCaja = 6;
          changed = true;
        }

        const oldCompra = Number(p.precioCompra || 0);
        const oldVenta = Number(p.precioVenta || 0);

        if (!p.precioCompraUnidad || Number(p.precioCompraUnidad) === 0) {
          p.precioCompraUnidad = oldCompra;
          changed = true;
        }

        if (!p.precioVentaUnidad || Number(p.precioVentaUnidad) === 0) {
          p.precioVentaUnidad = oldVenta;
          changed = true;
        }

        if (!p.precioCompraCaja || Number(p.precioCompraCaja) === 0) {
          p.precioCompraCaja = Number(p.precioCompraUnidad) * p.unidadesPorCaja;
          changed = true;
        }

        if (!p.precioVentaCaja || Number(p.precioVentaCaja) === 0) {
          p.precioVentaCaja = Number(p.precioVentaUnidad) * p.unidadesPorCaja;
          changed = true;
        }

        // Keep old precio_caja synced
        if (!p.precioCaja || Number(p.precioCaja) === 0) {
          p.precioCaja = Number(p.precioVentaCaja);
          changed = true;
        }

        if (changed) {
          await this.productoRepo.save(p);
        }
      }
      console.log('Migración de precios de productos completada.');
    } catch (e) {
      console.error('Error durante la migración de productos:', e);
    }
  }

  async updateCategoryImages() {
    try {
      console.log('Actualizando imágenes vacías de categorías con valores por defecto...');
      const imagesMap = {
        'Cervezas': 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=400',
        'Whisky': 'https://images.unsplash.com/photo-1569529465841-dfedd8d5043d?q=80&w=400',
        'Ron': 'https://images.unsplash.com/photo-1607622488478-f2f254e4c274?q=80&w=400',
        'Vodka': 'https://images.unsplash.com/photo-1596003903067-bf5762ad5c17?q=80&w=400',
        'Tequila': 'https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=400',
        'Vinos': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400',
        'Licores': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400',
        'Energizantes': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400',
        'Brandy': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400',
        'Singani': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400',
        'Gaseosas': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400',
        'Aguas': 'https://images.unsplash.com/photo-1608885898957-a599fb1b4a09?q=80&w=400',
      };
      
      for (const [nombre, imagen] of Object.entries(imagesMap)) {
        const cat = await this.categoriaRepo.findOne({ where: { nombre } });
        if (cat && !cat.imagen) {
          cat.imagen = imagen;
          await this.categoriaRepo.save(cat);
          console.log(`Categoría "${nombre}" actualizada con imagen por defecto.`);
        }
      }
      console.log('Verificación de imágenes de categorías completada.');
    } catch (error) {
      console.error('Error al actualizar imágenes de categorías por defecto:', error);
    }
  }

  async seed() {
    console.log('Iniciando seeder de La Fortaleza...');

    // ===== ROLES =====
    let rolAdmin = await this.rolRepo.findOne({ where: { nombre: 'ADMIN' } });
    if (!rolAdmin) {
      rolAdmin = await this.rolRepo.save(this.rolRepo.create({ nombre: 'ADMIN', descripcion: 'Administrador del sistema' }));
    }
    let rolVendedor = await this.rolRepo.findOne({ where: { nombre: 'VENDEDOR' } });
    if (!rolVendedor) {
      rolVendedor = await this.rolRepo.save(this.rolRepo.create({ nombre: 'VENDEDOR', descripcion: 'Vendedor de la licorería' }));
    }

    // ===== USUARIOS =====
    const adminUser = await this.usuarioRepo.findOne({ where: { usuario: 'admin' } });
    if (!adminUser) {
      await this.usuarioRepo.save(this.usuarioRepo.create({
        nombre: 'Administrador', apellido: 'Sistema', correo: 'admin@lafortaleza.com',
        usuario: 'admin', password: 'admin123', estado: true, rolId: rolAdmin.id,
      }));
    }
    const vend1 = await this.usuarioRepo.findOne({ where: { usuario: 'vendedor1' } });
    if (!vend1) {
      await this.usuarioRepo.save(this.usuarioRepo.create({
        nombre: 'Carlos', apellido: 'Mendoza', correo: 'carlos@lafortaleza.com',
        usuario: 'vendedor1', password: 'vend123', estado: true, rolId: rolVendedor.id,
      }));
    }
    const vend2 = await this.usuarioRepo.findOne({ where: { usuario: 'vendedor2' } });
    if (!vend2) {
      await this.usuarioRepo.save(this.usuarioRepo.create({
        nombre: 'María', apellido: 'Flores', correo: 'maria@lafortaleza.com',
        usuario: 'vendedor2', password: 'vend123', estado: true, rolId: rolVendedor.id,
      }));
    }

    // ===== CATEGORÍAS =====
    const categoriesToSeed = [
      { nombre: 'Cervezas', descripcion: 'Bebidas alcohólicas fermentadas' },
      { nombre: 'Whisky', descripcion: 'Destilados de cereales envejecidos' },
      { nombre: 'Ron', descripcion: 'Destilados de caña de azúcar' },
      { nombre: 'Vodka', descripcion: 'Destilado de cereales o patata' },
      { nombre: 'Tequila', descripcion: 'Destilado de agave azul' },
      { nombre: 'Vinos', descripcion: 'Bebidas fermentadas de uva' },
      { nombre: 'Licores', descripcion: 'Bebidas dulces destiladas' },
      { nombre: 'Energizantes', descripcion: 'Bebidas energéticas' },
      { nombre: 'Brandy', descripcion: 'Destilado de vino' },
      { nombre: 'Singani', descripcion: 'Destilado boliviano de uva moscatel' },
      { nombre: 'Gaseosas', descripcion: 'Bebidas refrescantes no alcohólicas' },
      { nombre: 'Aguas', descripcion: 'Aguas de mesa con o sin gas' }
    ];

    const categoryMap: Record<string, Categoria> = {};
    for (const catData of categoriesToSeed) {
      let cat = await this.categoriaRepo.findOne({ where: { nombre: catData.nombre } });
      if (!cat) {
        cat = await this.categoriaRepo.save(this.categoriaRepo.create(catData));
      }
      categoryMap[catData.nombre] = cat;
    }

    // ===== MARCAS =====
    const brandsToSeed = [
      { nombre: 'Paceña', paisOrigen: 'Bolivia' },
      { nombre: 'Huari', paisOrigen: 'Bolivia' },
      { nombre: 'Corona', paisOrigen: 'México' },
      { nombre: 'Heineken', paisOrigen: 'Países Bajos' },
      { nombre: 'Budweiser', paisOrigen: 'Estados Unidos' },
      { nombre: 'Johnnie Walker', paisOrigen: 'Escocia' },
      { nombre: 'Chivas Regal', paisOrigen: 'Escocia' },
      { nombre: "Jack Daniel's", paisOrigen: 'Estados Unidos' },
      { nombre: 'Old Parr', paisOrigen: 'Escocia' },
      { nombre: 'Bacardí', paisOrigen: 'Cuba' },
      { nombre: 'Havana Club', paisOrigen: 'Cuba' },
      { nombre: 'Absolut', paisOrigen: 'Suecia' },
      { nombre: 'Smirnoff', paisOrigen: 'Rusia' },
      { nombre: 'José Cuervo', paisOrigen: 'México' },
      { nombre: 'Casa Real', paisOrigen: 'Bolivia' },
      { nombre: 'Red Bull', paisOrigen: 'Austria' },
      { nombre: 'Monster', paisOrigen: 'Estados Unidos' },
      { nombre: 'Baileys', paisOrigen: 'Irlanda' },
      { nombre: 'Jägermeister', paisOrigen: 'Alemania' },
      { nombre: 'Ducal', paisOrigen: 'Bolivia' },
      { nombre: 'Bock', paisOrigen: 'Bolivia' },
      { nombre: 'Singani 63', paisOrigen: 'Bolivia' },
      { nombre: 'Casablanca', paisOrigen: 'Chile' },
      // Nuevas marcas
      { nombre: 'Coca-Cola', paisOrigen: 'Estados Unidos' },
      { nombre: 'Pepsi', paisOrigen: 'Estados Unidos' },
      { nombre: 'Sprite', paisOrigen: 'Estados Unidos' },
      { nombre: 'Fanta', paisOrigen: 'Estados Unidos' },
      { nombre: 'Seven Up', paisOrigen: 'Estados Unidos' },
      { nombre: 'Salvietti', paisOrigen: 'Bolivia' },
      { nombre: 'Agua Vital', paisOrigen: 'Bolivia' },
      { nombre: 'Agua San Luis', paisOrigen: 'Bolivia' }
    ];

    const brandMap: Record<string, Marca> = {};
    for (const brandData of brandsToSeed) {
      let b = await this.marcaRepo.findOne({ where: { nombre: brandData.nombre } });
      if (!b) {
        b = await this.marcaRepo.save(this.marcaRepo.create(brandData));
      }
      brandMap[brandData.nombre] = b;
    }

    // ===== PROVEEDORES =====
    const providersToSeed = [
      { nombre: 'Distribuidora Andina S.R.L.', nit: '1234567890', telefono: '22345678', correo: 'andina@dist.com', direccion: 'Av. 6 de Agosto #1234, La Paz' },
      { nombre: 'Importadora Bolivia Drinks', nit: '9876543210', telefono: '33456789', correo: 'boliviadrinks@import.com', direccion: 'Calle Comercio #567, Santa Cruz' },
      { nombre: 'Cervecería Boliviana Nacional (CBN)', nit: '1111111111', telefono: '22112233', correo: 'ventas@cbn.com.bo', direccion: 'Av. Montes #890, La Paz' },
      { nombre: 'Licores del Sur S.A.', nit: '2222222222', telefono: '44556677', correo: 'licoresdelsur@ventas.com', direccion: 'Zona Sur, Calle 21 #45, Cochabamba' },
      { nombre: 'Distribuidora Premium Spirits', nit: '3333333333', telefono: '77889900', correo: 'premium@spirits.com', direccion: 'Av. San Martín #234, Tarija' }
    ];

    const providerMap: Record<string, Proveedor> = {};
    for (const provData of providersToSeed) {
      let prov = await this.proveedorRepo.findOne({ where: { nombre: provData.nombre } });
      if (!prov) {
        prov = await this.proveedorRepo.save(this.proveedorRepo.create(provData));
      }
      providerMap[provData.nombre] = prov;
    }

    // ===== CLIENTES =====
    // Ensure "Cliente Ocasional" exists (CI/NIT: '0000000')
    let ocasionalClient = await this.clienteRepo.findOne({ where: { ciNit: '0000000' } });
    if (!ocasionalClient) {
      ocasionalClient = await this.clienteRepo.save(this.clienteRepo.create({
        nombre: 'Cliente',
        apellido: 'Ocasional',
        ciNit: '0000000',
        telefono: '00000000',
        correo: 'ocasional@lafortaleza.com'
      }));
    } else {
      // update its name to 'Cliente Ocasional' if it was named 'General'
      if (ocasionalClient.apellido !== 'Ocasional') {
        ocasionalClient.apellido = 'Ocasional';
        await this.clienteRepo.save(ocasionalClient);
      }
    }

    const clientsToSeed = [
      { nombre: 'Juan', apellido: 'Quispe', ciNit: '8765432', telefono: '71234567', correo: 'juan.q@email.com', direccion: 'Zona Norte, La Paz' },
      { nombre: 'Ana', apellido: 'Mamani', ciNit: '5678901', telefono: '72345678', correo: 'ana.m@email.com' },
      { nombre: 'Pedro', apellido: 'Condori', ciNit: '3456789', telefono: '73456789' },
      { nombre: 'Sofía', apellido: 'Vargas', ciNit: '9012345', telefono: '74567890', correo: 'sofia.v@email.com' }
    ];
    for (const cl of clientsToSeed) {
      const existing = await this.clienteRepo.findOne({ where: { ciNit: cl.ciNit } });
      if (!existing) {
        await this.clienteRepo.save(this.clienteRepo.create(cl));
      }
    }

    // ===== MÉTODOS DE PAGO =====
    const methodsToSeed = [
      { nombre: 'Efectivo', descripcion: 'Pago en efectivo' },
      { nombre: 'Tarjeta', descripcion: 'Pago con tarjeta de débito o crédito' },
      { nombre: 'QR', descripcion: 'Pago mediante código QR' },
      { nombre: 'Transferencia', descripcion: 'Transferencia bancaria' }
    ];
    for (const met of methodsToSeed) {
      const existing = await this.metodoPagoRepo.findOne({ where: { nombre: met.nombre } });
      if (!existing) {
        await this.metodoPagoRepo.save(this.metodoPagoRepo.create(met));
      }
    }

    // ===== PRODUCTOS =====
    const baseProductos = [
      // Cervezas (10)
      { nombre: 'Paceña 620ml', descripcion: 'Cerveza rubia boliviana', codigo: 'CERV-001', precioCompra: 6, precioVenta: 10, stock: 200, stockMinimo: 30, categoriaNombre: 'Cervezas', marcaNombre: 'Paceña', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      { nombre: 'Paceña Lata 355ml', descripcion: 'Cerveza Paceña en lata', codigo: 'CERV-002', precioCompra: 5, precioVenta: 8, stock: 150, stockMinimo: 20, categoriaNombre: 'Cervezas', marcaNombre: 'Paceña', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      { nombre: 'Huari 620ml', descripcion: 'Cerveza premium boliviana', codigo: 'CERV-003', precioCompra: 7, precioVenta: 12, stock: 180, stockMinimo: 25, categoriaNombre: 'Cervezas', marcaNombre: 'Huari', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      { nombre: 'Huari Lata 355ml', descripcion: 'Cerveza Huari en lata', codigo: 'CERV-004', precioCompra: 6, precioVenta: 9, stock: 120, stockMinimo: 20, categoriaNombre: 'Cervezas', marcaNombre: 'Huari', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      { nombre: 'Corona Extra 355ml', descripcion: 'Cerveza mexicana premium', codigo: 'CERV-005', precioCompra: 10, precioVenta: 15, stock: 100, stockMinimo: 15, categoriaNombre: 'Cervezas', marcaNombre: 'Corona', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Heineken 330ml', descripcion: 'Cerveza holandesa premium', codigo: 'CERV-006', precioCompra: 10, precioVenta: 16, stock: 90, stockMinimo: 15, categoriaNombre: 'Cervezas', marcaNombre: 'Heineken', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Budweiser 355ml', descripcion: 'Cerveza americana clásica', codigo: 'CERV-007', precioCompra: 8, precioVenta: 13, stock: 100, stockMinimo: 15, categoriaNombre: 'Cervezas', marcaNombre: 'Budweiser', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Ducal 620ml', descripcion: 'Cerveza boliviana económica', codigo: 'CERV-008', precioCompra: 5, precioVenta: 8, stock: 250, stockMinimo: 40, categoriaNombre: 'Cervezas', marcaNombre: 'Ducal', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      { nombre: 'Bock 620ml', descripcion: 'Cerveza boliviana tradicional', codigo: 'CERV-009', precioCompra: 5, precioVenta: 8, stock: 200, stockMinimo: 30, categoriaNombre: 'Cervezas', marcaNombre: 'Bock', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      { nombre: 'Paceña ICE 620ml', descripcion: 'Cerveza Paceña suave', codigo: 'CERV-010', precioCompra: 6, precioVenta: 10, stock: 150, stockMinimo: 20, categoriaNombre: 'Cervezas', marcaNombre: 'Paceña', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' },
      // Whisky (8)
      { nombre: 'Johnnie Walker Red Label 750ml', descripcion: 'Whisky escocés blended', codigo: 'WHSK-001', precioCompra: 80, precioVenta: 120, stock: 40, stockMinimo: 8, categoriaNombre: 'Whisky', marcaNombre: 'Johnnie Walker', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Johnnie Walker Black Label 750ml', descripcion: 'Whisky escocés premium 12 años', codigo: 'WHSK-002', precioCompra: 150, precioVenta: 220, stock: 30, stockMinimo: 5, categoriaNombre: 'Whisky', marcaNombre: 'Johnnie Walker', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Johnnie Walker Gold Label 750ml', descripcion: 'Whisky escocés gold reserve', codigo: 'WHSK-003', precioCompra: 250, precioVenta: 380, stock: 15, stockMinimo: 3, categoriaNombre: 'Whisky', marcaNombre: 'Johnnie Walker', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'Chivas Regal 12 Años 750ml', descripcion: 'Whisky escocés premium', codigo: 'WHSK-004', precioCompra: 160, precioVenta: 240, stock: 25, stockMinimo: 5, categoriaNombre: 'Whisky', marcaNombre: 'Chivas Regal', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: "Jack Daniel's Old No.7 750ml", descripcion: 'Tennessee whiskey americano', codigo: 'WHSK-005', precioCompra: 130, precioVenta: 195, stock: 35, stockMinimo: 8, categoriaNombre: 'Whisky', marcaNombre: "Jack Daniel's", proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: "Jack Daniel's Honey 750ml", descripcion: 'Tennessee whiskey con miel', codigo: 'WHSK-006', precioCompra: 140, precioVenta: 210, stock: 20, stockMinimo: 5, categoriaNombre: 'Whisky', marcaNombre: "Jack Daniel's", proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Old Parr 12 Años 750ml', descripcion: 'Whisky escocés suave', codigo: 'WHSK-007', precioCompra: 140, precioVenta: 210, stock: 25, stockMinimo: 5, categoriaNombre: 'Whisky', marcaNombre: 'Old Parr', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'Chivas Regal 18 Años 750ml', descripcion: 'Whisky escocés ultra premium', codigo: 'WHSK-008', precioCompra: 350, precioVenta: 520, stock: 10, stockMinimo: 2, categoriaNombre: 'Whisky', marcaNombre: 'Chivas Regal', proveedorNombre: 'Distribuidora Premium Spirits' },
      // Ron (6)
      { nombre: 'Bacardí Carta Blanca 750ml', descripcion: 'Ron blanco cubano', codigo: 'RON-001', precioCompra: 60, precioVenta: 90, stock: 45, stockMinimo: 10, categoriaNombre: 'Ron', marcaNombre: 'Bacardí', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Bacardí Carta Oro 750ml', descripcion: 'Ron dorado cubano', codigo: 'RON-002', precioCompra: 65, precioVenta: 95, stock: 35, stockMinimo: 8, categoriaNombre: 'Ron', marcaNombre: 'Bacardí', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Havana Club Añejo 3 Años 750ml', descripcion: 'Ron cubano 3 años', codigo: 'RON-003', precioCompra: 70, precioVenta: 105, stock: 30, stockMinimo: 8, categoriaNombre: 'Ron', marcaNombre: 'Havana Club', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Havana Club 7 Años 750ml', descripcion: 'Ron cubano premium 7 años', codigo: 'RON-004', precioCompra: 120, precioVenta: 180, stock: 20, stockMinimo: 5, categoriaNombre: 'Ron', marcaNombre: 'Havana Club', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Casa Real Ron Añejo 750ml', descripcion: 'Ron boliviano añejo', codigo: 'RON-005', precioCompra: 35, precioVenta: 55, stock: 60, stockMinimo: 15, categoriaNombre: 'Ron', marcaNombre: 'Casa Real', proveedorNombre: 'Licores del Sur S.A.' },
      { nombre: 'Casa Real Ron Blanco 750ml', descripcion: 'Ron boliviano blanco', codigo: 'RON-006', precioCompra: 30, precioVenta: 45, stock: 70, stockMinimo: 15, categoriaNombre: 'Ron', marcaNombre: 'Casa Real', proveedorNombre: 'Licores del Sur S.A.' },
      // Vodka (5)
      { nombre: 'Absolut Original 750ml', descripcion: 'Vodka sueco premium', codigo: 'VODK-001', precioCompra: 85, precioVenta: 130, stock: 35, stockMinimo: 8, categoriaNombre: 'Vodka', marcaNombre: 'Absolut', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Absolut Citron 750ml', descripcion: 'Vodka sueco sabor limón', codigo: 'VODK-002', precioCompra: 90, precioVenta: 135, stock: 25, stockMinimo: 5, categoriaNombre: 'Vodka', marcaNombre: 'Absolut', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Smirnoff Red 750ml', descripcion: 'Vodka ruso clásico', codigo: 'VODK-003', precioCompra: 55, precioVenta: 85, stock: 50, stockMinimo: 10, categoriaNombre: 'Vodka', marcaNombre: 'Smirnoff', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Smirnoff Green Apple 750ml', descripcion: 'Vodka sabor manzana verde', codigo: 'VODK-004', precioCompra: 58, precioVenta: 88, stock: 30, stockMinimo: 8, categoriaNombre: 'Vodka', marcaNombre: 'Smirnoff', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Absolut Raspberry 750ml', descripcion: 'Vodka sueco sabor frambuesa', codigo: 'VODK-005', precioCompra: 90, precioVenta: 135, stock: 20, stockMinimo: 5, categoriaNombre: 'Vodka', marcaNombre: 'Absolut', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      // Tequila (4)
      { nombre: 'José Cuervo Especial Gold 750ml', descripcion: 'Tequila reposado mexicano', codigo: 'TEQU-001', precioCompra: 75, precioVenta: 115, stock: 40, stockMinimo: 8, categoriaNombre: 'Tequila', marcaNombre: 'José Cuervo', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'José Cuervo Especial Silver 750ml', descripcion: 'Tequila blanco mexicano', codigo: 'TEQU-002', precioCompra: 70, precioVenta: 110, stock: 35, stockMinimo: 8, categoriaNombre: 'Tequila', marcaNombre: 'José Cuervo', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'José Cuervo Tradicional 750ml', descripcion: 'Tequila reposado premium', codigo: 'TEQU-003', precioCompra: 95, precioVenta: 145, stock: 20, stockMinimo: 5, categoriaNombre: 'Tequila', marcaNombre: 'José Cuervo', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'José Cuervo Margarita Mix 1L', descripcion: 'Mix preparado para margarita', codigo: 'TEQU-004', precioCompra: 40, precioVenta: 65, stock: 45, stockMinimo: 10, categoriaNombre: 'Tequila', marcaNombre: 'José Cuervo', proveedorNombre: 'Importadora Bolivia Drinks' },
      // Licores (4)
      { nombre: 'Baileys Original 750ml', descripcion: 'Crema de whisky irlandesa', codigo: 'LICR-001', precioCompra: 100, precioVenta: 155, stock: 25, stockMinimo: 5, categoriaNombre: 'Licores', marcaNombre: 'Baileys', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Jägermeister 700ml', descripcion: 'Licor de hierbas alemán', codigo: 'LICR-002', precioCompra: 95, precioVenta: 145, stock: 30, stockMinimo: 8, categoriaNombre: 'Licores', marcaNombre: 'Jägermeister', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Baileys Strawberry 750ml', descripcion: 'Crema de whisky sabor fresa', codigo: 'LICR-003', precioCompra: 105, precioVenta: 160, stock: 15, stockMinimo: 3, categoriaNombre: 'Licores', marcaNombre: 'Baileys', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'Jägermeister Cold Brew 500ml', descripcion: 'Licor de hierbas con café', codigo: 'LICR-004', precioCompra: 85, precioVenta: 130, stock: 20, stockMinimo: 5, categoriaNombre: 'Licores', marcaNombre: 'Jägermeister', proveedorNombre: 'Distribuidora Premium Spirits' },
      // Energizantes (4)
      { nombre: 'Red Bull 250ml', descripcion: 'Bebida energética clásica', codigo: 'ENER-001', precioCompra: 8, precioVenta: 14, stock: 300, stockMinimo: 50, categoriaNombre: 'Energizantes', marcaNombre: 'Red Bull', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Red Bull Sugar Free 250ml', descripcion: 'Bebida energética sin azúcar', codigo: 'ENER-002', precioCompra: 9, precioVenta: 15, stock: 150, stockMinimo: 30, categoriaNombre: 'Energizantes', marcaNombre: 'Red Bull', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Monster Energy 473ml', descripcion: 'Bebida energética clásica', codigo: 'ENER-003', precioCompra: 10, precioVenta: 16, stock: 200, stockMinimo: 40, categoriaNombre: 'Energizantes', marcaNombre: 'Monster', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Monster Ultra 473ml', descripcion: 'Bebida energética zero azúcar', codigo: 'ENER-004', precioCompra: 11, precioVenta: 17, stock: 120, stockMinimo: 25, categoriaNombre: 'Energizantes', marcaNombre: 'Monster', proveedorNombre: 'Importadora Bolivia Drinks' },
      // Singani (3)
      { nombre: 'Singani 63 750ml', descripcion: 'Singani premium boliviano', codigo: 'SING-001', precioCompra: 70, precioVenta: 110, stock: 40, stockMinimo: 10, categoriaNombre: 'Singani', marcaNombre: 'Singani 63', proveedorNombre: 'Licores del Sur S.A.' },
      { nombre: 'Casa Real Singani 750ml', descripcion: 'Singani boliviano tradicional', codigo: 'SING-002', precioCompra: 30, precioVenta: 50, stock: 80, stockMinimo: 15, categoriaNombre: 'Singani', marcaNombre: 'Casa Real', proveedorNombre: 'Licores del Sur S.A.' },
      { nombre: 'Casa Real Singani de Altura 750ml', descripcion: 'Singani premium de altura', codigo: 'SING-003', precioCompra: 45, precioVenta: 70, stock: 50, stockMinimo: 10, categoriaNombre: 'Singani', marcaNombre: 'Casa Real', proveedorNombre: 'Licores del Sur S.A.' },
      // Vinos (4)
      { nombre: 'Casablanca Cabernet Sauvignon 750ml', descripcion: 'Vino tinto chileno', codigo: 'VINO-001', precioCompra: 45, precioVenta: 70, stock: 30, stockMinimo: 8, categoriaNombre: 'Vinos', marcaNombre: 'Casablanca', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'Casablanca Merlot 750ml', descripcion: 'Vino tinto suave chileno', codigo: 'VINO-002', precioCompra: 48, precioVenta: 75, stock: 25, stockMinimo: 5, categoriaNombre: 'Vinos', marcaNombre: 'Casablanca', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'Casablanca Sauvignon Blanc 750ml', descripcion: 'Vino blanco chileno', codigo: 'VINO-003', precioCompra: 42, precioVenta: 68, stock: 25, stockMinimo: 5, categoriaNombre: 'Vinos', marcaNombre: 'Casablanca', proveedorNombre: 'Distribuidora Premium Spirits' },
      { nombre: 'Casablanca Chardonnay 750ml', descripcion: 'Vino blanco premium chileno', codigo: 'VINO-004', precioCompra: 50, precioVenta: 80, stock: 20, stockMinimo: 5, categoriaNombre: 'Vinos', marcaNombre: 'Casablanca', proveedorNombre: 'Distribuidora Premium Spirits' },
      // Brandy (2)
      { nombre: 'Casa Real Brandy 750ml', descripcion: 'Brandy boliviano tradicional', codigo: 'BRND-001', precioCompra: 28, precioVenta: 45, stock: 50, stockMinimo: 10, categoriaNombre: 'Brandy', marcaNombre: 'Casa Real', proveedorNombre: 'Licores del Sur S.A.' },
      { nombre: 'Casa Real Brandy Reserva 750ml', descripcion: 'Brandy boliviano reserva especial', codigo: 'BRND-002', precioCompra: 40, precioVenta: 65, stock: 30, stockMinimo: 8, categoriaNombre: 'Brandy', marcaNombre: 'Casa Real', proveedorNombre: 'Licores del Sur S.A.' },

      // === Gaseosas (12) ===
      { nombre: 'Coca-Cola 500ml', descripcion: 'Refresco sabor cola original', codigo: 'GAS-001', precioCompra: 4.5, precioVenta: 6, stock: 300, stockMinimo: 40, categoriaNombre: 'Gaseosas', marcaNombre: 'Coca-Cola', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Coca-Cola 2L', descripcion: 'Refresco Coca-Cola familiar', codigo: 'GAS-002', precioCompra: 9.5, precioVenta: 12, stock: 200, stockMinimo: 30, categoriaNombre: 'Gaseosas', marcaNombre: 'Coca-Cola', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Coca-Cola Sin Azúcar', descripcion: 'Coca-Cola sin azúcar 500ml', codigo: 'GAS-003', precioCompra: 4.5, precioVenta: 6, stock: 150, stockMinimo: 20, categoriaNombre: 'Gaseosas', marcaNombre: 'Coca-Cola', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Sprite 500ml', descripcion: 'Refresco sabor lima limón', codigo: 'GAS-004', precioCompra: 4.5, precioVenta: 6, stock: 120, stockMinimo: 15, categoriaNombre: 'Gaseosas', marcaNombre: 'Sprite', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Sprite 2L', descripcion: 'Refresco Sprite familiar', codigo: 'GAS-005', precioCompra: 9.5, precioVenta: 12, stock: 100, stockMinimo: 15, categoriaNombre: 'Gaseosas', marcaNombre: 'Sprite', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Fanta Naranja 500ml', descripcion: 'Refresco sabor naranja', codigo: 'GAS-006', precioCompra: 4.5, precioVenta: 6, stock: 150, stockMinimo: 20, categoriaNombre: 'Gaseosas', marcaNombre: 'Fanta', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Fanta Naranja 2L', descripcion: 'Refresco Fanta Naranja familiar', codigo: 'GAS-007', precioCompra: 9.5, precioVenta: 12, stock: 100, stockMinimo: 15, categoriaNombre: 'Gaseosas', marcaNombre: 'Fanta', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Fanta Papaya', descripcion: 'Refresco sabor papaya', codigo: 'GAS-008', precioCompra: 4.5, precioVenta: 6, stock: 100, stockMinimo: 15, categoriaNombre: 'Gaseosas', marcaNombre: 'Fanta', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Pepsi 500ml', descripcion: 'Refresco Pepsi original', codigo: 'GAS-009', precioCompra: 4.0, precioVenta: 5.5, stock: 200, stockMinimo: 30, categoriaNombre: 'Gaseosas', marcaNombre: 'Pepsi', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Pepsi 2L', descripcion: 'Refresco Pepsi familiar', codigo: 'GAS-010', precioCompra: 8.5, precioVenta: 11, stock: 150, stockMinimo: 25, categoriaNombre: 'Gaseosas', marcaNombre: 'Pepsi', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Seven Up', descripcion: 'Refresco 7 Up lima limón 500ml', codigo: 'GAS-011', precioCompra: 4.0, precioVenta: 5.5, stock: 100, stockMinimo: 15, categoriaNombre: 'Gaseosas', marcaNombre: 'Seven Up', proveedorNombre: 'Importadora Bolivia Drinks' },
      { nombre: 'Salvietti Cola', descripcion: 'Refresco tradicional boliviano de papaya', codigo: 'GAS-012', precioCompra: 3.5, precioVenta: 5, stock: 120, stockMinimo: 15, categoriaNombre: 'Gaseosas', marcaNombre: 'Salvietti', proveedorNombre: 'Importadora Bolivia Drinks' },
      // Aguas (2)
      { nombre: 'Agua Vital', descripcion: 'Agua de mesa purificada sin gas', codigo: 'AGUA-001', precioCompra: 2.5, precioVenta: 4.0, stock: 200, stockMinimo: 30, categoriaNombre: 'Aguas', marcaNombre: 'Agua Vital', proveedorNombre: 'Distribuidora Andina S.R.L.' },
      { nombre: 'Agua San Luis', descripcion: 'Agua de mesa con gas', codigo: 'AGUA-002', precioCompra: 2.5, precioVenta: 4.0, stock: 150, stockMinimo: 20, categoriaNombre: 'Aguas', marcaNombre: 'Agua San Luis', proveedorNombre: 'Cervecería Boliviana Nacional (CBN)' }
    ];

    const seededProductsMap: Record<string, Producto> = {};

    for (const prodData of baseProductos) {
      let prod = await this.productoRepo.findOne({ where: { codigo: prodData.codigo } });
      const cat = categoryMap[prodData.categoriaNombre];
      const brand = brandMap[prodData.marcaNombre];
      const prov = providerMap[prodData.proveedorNombre];

      let tipoBebida = 'Alcoholica';
      if (['Energizantes', 'Gaseosas', 'Aguas'].includes(prodData.categoriaNombre)) {
        tipoBebida = 'No Alcoholica';
      }

      let imgUrl = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400';
      if (prodData.categoriaNombre === 'Cervezas') {
        imgUrl = 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Whisky') {
        imgUrl = 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Ron') {
        imgUrl = 'https://images.unsplash.com/photo-1614313511387-1436a4480edd?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Vodka') {
        imgUrl = 'https://images.unsplash.com/photo-1596701062351-df5f8a4261e5?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Tequila') {
        imgUrl = 'https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Licores') {
        imgUrl = 'https://images.unsplash.com/photo-1568649929103-28ffeedeca07?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Energizantes') {
        imgUrl = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Vinos') {
        imgUrl = 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Gaseosas') {
        imgUrl = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400';
      } else if (prodData.categoriaNombre === 'Aguas') {
        imgUrl = 'https://images.unsplash.com/photo-1608885898957-a599fb1b4a09?q=80&w=400';
      }

      if (!prod) {
        prod = await this.productoRepo.save(this.productoRepo.create({
          nombre: prodData.nombre,
          descripcion: prodData.descripcion,
          codigo: prodData.codigo,
          precioCompra: prodData.precioCompra,
          precioVenta: prodData.precioVenta,
          stock: prodData.stock,
          stockMinimo: prodData.stockMinimo,
          imagen: imgUrl,
          tipoBebida,
          esCombo: false,
          categoriaId: cat ? cat.id : null,
          marcaId: brand ? brand.id : null,
          proveedorId: prov ? prov.id : null
        } as any)) as any;
      } else {
        prod.tipoBebida = tipoBebida;
        prod.categoriaId = cat ? cat.id : prod.categoriaId;
        prod.marcaId = brand ? brand.id : prod.marcaId;
        prod.proveedorId = prov ? prov.id : prod.proveedorId;
        await this.productoRepo.save(prod);
      }
      seededProductsMap[prodData.codigo] = prod!;
    }

    // ===== COMBOS =====
    const combosToSeed = [
      {
        nombre: 'Combo Fiesta',
        descripcion: '1 Jack Daniel\'s + 2 Coca-Cola 2L a precio especial.',
        codigo: 'COMB-001',
        precioCompra: 140.00,
        precioVenta: 200.00,
        stock: 20,
        stockMinimo: 2,
        categoriaNombre: 'Licores',
        marcaNombre: "Jack Daniel's",
        proveedorNombre: 'Distribuidora Andina S.R.L.',
        items: [
          { codigo: 'WHSK-005', cantidad: 1 }, // Jack Daniels
          { codigo: 'GAS-002', cantidad: 2 }   // Coca-Cola 2L
        ]
      },
      {
        nombre: 'Combo Energético',
        descripcion: '1 Jägermeister 700ml + 2 Red Bull 250ml a precio especial.',
        codigo: 'COMB-002',
        precioCompra: 110.00,
        precioVenta: 160.00,
        stock: 15,
        stockMinimo: 2,
        categoriaNombre: 'Licores',
        marcaNombre: 'Jägermeister',
        proveedorNombre: 'Distribuidora Andina S.R.L.',
        items: [
          { codigo: 'LICR-002', cantidad: 1 }, // Jagermeister
          { codigo: 'ENER-001', cantidad: 2 }  // Red Bull
        ]
      }
    ];

    for (const comboData of combosToSeed) {
      let combo = await this.productoRepo.findOne({ where: { codigo: comboData.codigo } });
      const cat = categoryMap[comboData.categoriaNombre];
      const brand = brandMap[comboData.marcaNombre];
      const prov = providerMap[comboData.proveedorNombre];

      if (!combo) {
        combo = await this.productoRepo.save(this.productoRepo.create({
          nombre: comboData.nombre,
          descripcion: comboData.descripcion,
          codigo: comboData.codigo,
          precioCompra: comboData.precioCompra,
          precioVenta: comboData.precioVenta,
          stock: comboData.stock,
          stockMinimo: comboData.stockMinimo,
          imagen: 'https://images.unsplash.com/photo-1568649929103-28ffeedeca07?q=80&w=400',
          tipoBebida: 'Alcoholica',
          esCombo: true,
          categoriaId: cat ? cat.id : null,
          marcaId: brand ? brand.id : null,
          proveedorId: prov ? prov.id : null
        } as any)) as any;
      }

      // Seed ComboProducto relation
      for (const item of comboData.items) {
        const componentProd = seededProductsMap[item.codigo];
        if (componentProd) {
          const relationExists = await this.comboProductoRepo.findOne({
            where: { comboId: combo!.id, productoId: componentProd.id }
          });
          if (!relationExists) {
            await this.comboProductoRepo.save(this.comboProductoRepo.create({
              comboId: combo!.id,
              productoId: componentProd.id,
              cantidad: item.cantidad
            } as any));
          }
        }
      }
    }

    console.log('Seeder completado con nuevos productos no alcohólicos y combos.');
  }
}
