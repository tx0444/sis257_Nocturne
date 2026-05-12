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
import { Producto } from '../../productos/entities/producto.entity';
import { MovimientoInventario } from '../../movimientos-inventario/entities/movimiento-inventario.entity';

@Entity('inventarios')
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_lote', length: 50 })
  numeroLote: string;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'cantidad_original', type: 'int', nullable: true })
  cantidadOriginal: number;

  @Column({ name: 'fecha_vencimiento', type: 'date', nullable: true })
  fechaVencimiento: Date;

  @Column({ name: 'fecha_entrada', type: 'date', nullable: true })
  fechaEntrada: Date;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioUnitario: number;

  @Column({ name: 'estado', default: 'disponible' })
  estado: string; // 'disponible', 'reservado', 'vencido', 'eliminado'

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Producto, (producto) => producto.inventarios)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;

  @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.inventario)
  movimientos: MovimientoInventario[];
}