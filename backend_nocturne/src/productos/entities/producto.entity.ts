import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Marca } from '../../marcas/entities/marca.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { DetalleCompra } from '../../detalles-compra/entities/detalle-compra.entity';
import { DetalleVenta } from '../../detalles-venta/entities/detalle-venta.entity';
import { Promocion } from '../../promociones/entities/promocion.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 500, nullable: true })
  descripcion: string;

  @Column({ length: 50, unique: true })
  codigo: string;

  @Column({ name: 'precio_compra', type: 'decimal', precision: 10, scale: 2, default: 0 })
  precioCompra: number;

  @Column({ name: 'precio_venta', type: 'decimal', precision: 10, scale: 2 })
  precioVenta: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'stock_minimo', type: 'int', default: 5 })
  stockMinimo: number;

  @Column({ length: 500, nullable: true })
  imagen: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ name: 'unidad_medida', length: 50, default: 'Unidad' })
  unidadMedida: string;

  @Column({ name: 'vende_por_unidad', type: 'boolean', nullable: true, default: true })
  vendePorUnidad: boolean;

  @Column({ name: 'vende_por_caja', type: 'boolean', nullable: true, default: true })
  vendePorCaja: boolean;

  @Column({ name: 'unidades_por_caja', type: 'int', nullable: true, default: 6 })
  unidadesPorCaja: number;

  @Column({ name: 'precio_caja', type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioCaja: number;

  @Column({ name: 'precio_compra_unidad', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  precioCompraUnidad: number;

  @Column({ name: 'precio_compra_caja', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  precioCompraCaja: number;

  @Column({ name: 'precio_venta_unidad', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  precioVentaUnidad: number;

  @Column({ name: 'precio_venta_caja', type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
  precioVentaCaja: number;

  @Column({ name: 'tipo_bebida', length: 50, default: 'Alcoholica' })
  tipoBebida: string; // 'Alcoholica' | 'No Alcoholica'

  @Column({ name: 'es_combo', type: 'boolean', default: false })
  esCombo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp', nullable: true })
  fechaEliminacion: Date;

  // Relaciones
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'categoria_id', nullable: true })
  categoriaId: number;

  @ManyToOne(() => Marca, (marca) => marca.productos)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @Column({ name: 'marca_id', nullable: true })
  marcaId: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;

  @Column({ name: 'proveedor_id', nullable: true })
  proveedorId: number;

  @OneToMany(() => DetalleCompra, (detalle) => detalle.producto)
  detallesCompra: DetalleCompra[];

  @OneToMany(() => DetalleVenta, (detalle) => detalle.producto)
  detallesVenta: DetalleVenta[];

  @ManyToOne(() => Promocion, (promocion) => promocion.productos, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'promocion_id' })
  promocion: Promocion;

  @Column({ name: 'promocion_id', type: 'integer', nullable: true })
  promocionId: number | null;
}
