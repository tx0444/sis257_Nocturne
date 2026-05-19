import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';

type CategoriaSeed = {
  nombre: string;
  descripcion: string;
};

type ProductoSeed = {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  categoria: string;
};

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Empleado)
    private readonly empleadosRepository: Repository<Empleado>,
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    try {
      const shouldSeed =
        this.configService.get('SEED_ON_BOOT', 'false') === 'true';

      if (!shouldSeed) {
        this.logger.log('Seed deshabilitado (SEED_ON_BOOT=false)');
        return;
      }

      await this.seedCatalogoDemo();
      await this.seedAdmin();
    } catch (error) {
      this.logger.error('Error ejecutando seed inicial:', error);
    }
  }

  private async seedAdmin() {
    const empleadosCount = await this.empleadosRepository.count();
    if (empleadosCount > 0) {
      this.logger.log(
        `Admin omitido: ya existen ${empleadosCount} empleado(s)`,
      );
      return;
    }

    const nombre = this.configService.get(
      'SEED_ADMIN_NAME',
      'Administrador Nocturne',
    );
    const email = this.configService.get(
      'SEED_ADMIN_EMAIL',
      'admin@nocturne.bo',
    );
    const password = this.configService.get(
      'SEED_ADMIN_PASSWORD',
      'Nocturne2026!',
    );

    await this.empleadosRepository.save(
      this.empleadosRepository.create({
        nombre,
        email,
        password,
        activo: true,
      }),
    );

    this.logger.log('Admin demo creado correctamente');
    this.logger.log(`Email: ${email}`);
    this.logger.log(`Password: ${password}`);
  }

  private async seedCatalogoDemo() {
    const categorias = await this.ensureCategorias([
      {
        nombre: 'Vinos premium',
        descripcion: 'Vinos seleccionados para catas y regalos ejecutivos',
      },
      {
        nombre: 'Destilados',
        descripcion: 'Whisky, ron, vodka, gin y singani de alta rotacion',
      },
      {
        nombre: 'Champagne',
        descripcion: 'Espumantes y champagne para eventos exclusivos',
      },
      {
        nombre: 'Cervezas artesanales',
        descripcion: 'Cervezas de autor para venta rapida en tienda',
      },
      {
        nombre: 'Licores dulces',
        descripcion: 'Cremas, aperitivos y licores para cocteleria',
      },
      {
        nombre: 'Cocteleria',
        descripcion: 'Insumos premium para preparar cocteles',
      },
      {
        nombre: 'Ediciones limitadas',
        descripcion: 'Botellas de coleccion con bajo stock',
      },
      {
        nombre: 'Sin alcohol',
        descripcion: 'Alternativas premium para clientes sobrios',
      },
    ]);

    const productosCreados = await this.ensureProductos(categorias, [
      {
        nombre: 'Malbec Reserva Nocturne',
        descripcion: 'Vino tinto reserva para cata nocturna',
        precio: 185,
        stock: 18,
        imagenUrl:
          'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
        categoria: 'Vinos premium',
      },
      {
        nombre: 'Cabernet Gran Altura',
        descripcion: 'Vino robusto para maridar carnes y quesos',
        precio: 210,
        stock: 15,
        imagenUrl:
          'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600',
        categoria: 'Vinos premium',
      },
      {
        nombre: 'Tannat Coleccion Privada',
        descripcion: 'Vino de cuerpo intenso para miembros Nocturne',
        precio: 245,
        stock: 11,
        imagenUrl:
          'https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=600',
        categoria: 'Vinos premium',
      },
      {
        nombre: 'Whisky Single Malt 12',
        descripcion: 'Destilado premium para clientes de membresia',
        precio: 420,
        stock: 10,
        imagenUrl:
          'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600',
        categoria: 'Destilados',
      },
      {
        nombre: 'Ron Anejo Barrica',
        descripcion: 'Ron oscuro con notas de vainilla y madera',
        precio: 190,
        stock: 22,
        imagenUrl:
          'https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=600',
        categoria: 'Destilados',
      },
      {
        nombre: 'Vodka Cristal Premium',
        descripcion: 'Vodka limpio para cocteles y venta express',
        precio: 160,
        stock: 28,
        imagenUrl:
          'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?w=600',
        categoria: 'Destilados',
      },
      {
        nombre: 'Gin Botanico Andes',
        descripcion: 'Gin aromatico para cocteleria de autor',
        precio: 175,
        stock: 20,
        imagenUrl:
          'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600',
        categoria: 'Destilados',
      },
      {
        nombre: 'Singani Reserva 63',
        descripcion: 'Singani boliviano para identidad local',
        precio: 140,
        stock: 25,
        imagenUrl:
          'https://images.unsplash.com/photo-1614630623340-8f4f5b0d00b2?w=600',
        categoria: 'Destilados',
      },
      {
        nombre: 'Champagne Brut Imperial',
        descripcion: 'Espumante para eventos y celebraciones',
        precio: 360,
        stock: 7,
        imagenUrl:
          'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?w=600',
        categoria: 'Champagne',
      },
      {
        nombre: 'Prosecco Noche Dorada',
        descripcion: 'Espumante fresco para pedidos de evento',
        precio: 230,
        stock: 14,
        imagenUrl:
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
        categoria: 'Champagne',
      },
      {
        nombre: 'Cava Brut Reserva',
        descripcion: 'Burbuja seca para paquetes promocionales',
        precio: 205,
        stock: 16,
        imagenUrl:
          'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600',
        categoria: 'Champagne',
      },
      {
        nombre: 'IPA Boveda Fria',
        descripcion: 'Cerveza artesanal con amargor balanceado',
        precio: 38,
        stock: 45,
        imagenUrl:
          'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600',
        categoria: 'Cervezas artesanales',
      },
      {
        nombre: 'Stout Medianoche',
        descripcion: 'Cerveza oscura con cuerpo y notas tostadas',
        precio: 42,
        stock: 34,
        imagenUrl:
          'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600',
        categoria: 'Cervezas artesanales',
      },
      {
        nombre: 'Lager Santa Cruz',
        descripcion: 'Cerveza ligera para ventas de alto volumen',
        precio: 30,
        stock: 60,
        imagenUrl:
          'https://images.unsplash.com/photo-1595974482597-4b8da8879bc8?w=600',
        categoria: 'Cervezas artesanales',
      },
      {
        nombre: 'Crema Irlandesa Nocturne',
        descripcion: 'Licor cremoso para postres y cocteles',
        precio: 115,
        stock: 24,
        imagenUrl:
          'https://images.unsplash.com/photo-1564700670715-b3f4e7d977f2?w=600',
        categoria: 'Licores dulces',
      },
      {
        nombre: 'Amaretto Oro',
        descripcion: 'Licor dulce de almendra para sobremesa',
        precio: 125,
        stock: 18,
        imagenUrl:
          'https://images.unsplash.com/photo-1569529465841-dfecdabdb3ce?w=600',
        categoria: 'Licores dulces',
      },
      {
        nombre: 'Vermut Rojo Clasico',
        descripcion: 'Aperitivo ideal para cocteles y tablas',
        precio: 95,
        stock: 26,
        imagenUrl:
          'https://images.unsplash.com/photo-1606765962248-7ff407b51667?w=600',
        categoria: 'Licores dulces',
      },
      {
        nombre: 'Pack Negroni Premium',
        descripcion: 'Kit con gin, vermut y bitter para demo de venta',
        precio: 310,
        stock: 9,
        imagenUrl:
          'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600',
        categoria: 'Cocteleria',
      },
      {
        nombre: 'Bitter Naranja Intenso',
        descripcion: 'Complemento de cocteleria para ventas cruzadas',
        precio: 85,
        stock: 31,
        imagenUrl:
          'https://images.unsplash.com/photo-1621873495884-845a939892d1?w=600',
        categoria: 'Cocteleria',
      },
      {
        nombre: 'Jarabe Tonica Botanica',
        descripcion: 'Insumo premium para gin tonic',
        precio: 65,
        stock: 38,
        imagenUrl:
          'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600',
        categoria: 'Cocteleria',
      },
      {
        nombre: 'Whisky Nocturne Black Label',
        descripcion: 'Edicion limitada para mostrar bajo stock',
        precio: 780,
        stock: 4,
        imagenUrl:
          'https://images.unsplash.com/photo-1569529465841-dfecdabdb3ce?w=600',
        categoria: 'Ediciones limitadas',
      },
      {
        nombre: 'Cognac Reserva Privada',
        descripcion: 'Botella de coleccion para clientes VIP',
        precio: 890,
        stock: 3,
        imagenUrl:
          'https://images.unsplash.com/photo-1581022295087-35e593704911?w=600',
        categoria: 'Ediciones limitadas',
      },
      {
        nombre: 'Gin 0.0 Botanico',
        descripcion: 'Alternativa sin alcohol para cocteles',
        precio: 120,
        stock: 19,
        imagenUrl:
          'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600',
        categoria: 'Sin alcohol',
      },
      {
        nombre: 'Espumante 0.0 Dorado',
        descripcion: 'Bebida sin alcohol para eventos familiares',
        precio: 95,
        stock: 21,
        imagenUrl:
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
        categoria: 'Sin alcohol',
      },
    ]);

    this.logger.log(
      `Catalogo demo verificado: ${categorias.size} categoria(s), ${productosCreados} producto(s) nuevo(s)`,
    );
  }

  private async ensureCategorias(seed: CategoriaSeed[]) {
    const map = new Map<string, Categoria>();

    for (const item of seed) {
      let categoria = await this.categoriasRepository.findOne({
        where: { nombre: item.nombre },
      });

      if (!categoria) {
        categoria = await this.categoriasRepository.save(
          this.categoriasRepository.create({
            ...item,
            activo: true,
          }),
        );
      } else if (!categoria.activo) {
        categoria.activo = true;
        categoria.descripcion = categoria.descripcion || item.descripcion;
        categoria = await this.categoriasRepository.save(categoria);
      }

      map.set(item.nombre, categoria);
    }

    return map;
  }

  private async ensureProductos(
    categorias: Map<string, Categoria>,
    seed: ProductoSeed[],
  ) {
    let created = 0;

    for (const item of seed) {
      const categoria = categorias.get(item.categoria);
      if (!categoria) continue;

      const existing = await this.productosRepository.findOne({
        where: { nombre: item.nombre },
        withDeleted: true,
      });

      if (existing) {
        if (!existing.activo || existing.stock <= 0) {
          existing.activo = true;
          existing.stock = Math.max(existing.stock, item.stock);
          await this.productosRepository.save(existing);
        }
        continue;
      }

      await this.productosRepository.save(
        this.productosRepository.create({
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          stock: item.stock,
          imagenUrl: item.imagenUrl,
          categoriaId: categoria.id,
          activo: true,
        }),
      );
      created += 1;
    }

    return created;
  }
}
