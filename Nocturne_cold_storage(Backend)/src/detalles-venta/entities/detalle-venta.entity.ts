import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Inventario } from '../../inventarios/entities/inventario.entity';

export enum TemperaturaBebida {
  NATURAL = 'natural',
  FRIA = 'fria',
}

@Entity('detalles_venta')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  descuento: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ name: 'numero_lote', length: 50, nullable: true })
  numeroLote: string;

  @Column({ type: 'enum', enum: TemperaturaBebida, default: TemperaturaBebida.NATURAL })
  temperaturaSeleccionada: TemperaturaBebida;

  @Column({ length: 500, nullable: true })
  observaciones: string;

  // Relaciones
  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ name: 'venta_id' })
  ventaId: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesVenta)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Inventario)
  @JoinColumn({ name: 'inventario_id' })
  inventario: Inventario;

  @Column({ name: 'inventario_id' })
  inventarioId: number;
}