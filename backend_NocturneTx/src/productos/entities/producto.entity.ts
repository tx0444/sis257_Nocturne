import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categorias.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Inventario } from '../../inventarios/entities/inventario.entity';
import { DetalleVenta } from '../../detalles-venta/entities/detalle-venta.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 500, nullable: true })
  descripcion: string;

  @Column({ name: 'grado_alcoholico', type: 'decimal', precision: 4, scale: 2, nullable: true })
  gradoAlcoholico: number;

  @Column({ name: 'requiere_frio', default: false })
  requiereFrio: boolean;

  @Column({ name: 'precio_compra', type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioCompra: number;

  @Column({ name: 'precio_venta', type: 'decimal', precision: 10, scale: 2 })
  precioVenta: number;

  @Column({ length: 100, nullable: true })
  unidad: string; // 'unidad', 'litro', 'caja'

  @Column({ name: 'codigo_barras', length: 50, nullable: true, unique: true })
  codigoBarras: string;

  @Column({ name: 'imagen_url', length: 500, nullable: true })
  imagenUrl: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'categoria_id', nullable: true })
  categoriaId: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ name: 'proveedor_id', nullable: true })
  proveedorId: number;

  @OneToMany(() => Inventario, (inventario) => inventario.producto)
  inventarios: Inventario[];

  @OneToMany(() => DetalleVenta, (detalle) => detalle.producto)
  detallesVenta: DetalleVenta[];
}