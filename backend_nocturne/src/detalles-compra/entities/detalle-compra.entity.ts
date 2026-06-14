import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Compra } from '../../compras/entities/compra.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('detalles_compra')
export class DetalleCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  // Relaciones
  @ManyToOne(() => Compra, (compra) => compra.detalles)
  @JoinColumn({ name: 'compra_id' })
  compra: Compra;

  @Column({ name: 'compra_id' })
  compraId: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesCompra)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp' })
  fechaEliminacion: Date;
}
