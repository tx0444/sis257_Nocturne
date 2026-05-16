import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Factura } from './factura.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('detalles_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'descripcion', length: 255 })
  descripcion: string;

  @Column({ length: 50 })
  referencia: string;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'unidad_medida', length: 20, default: 'UND' })
  unidadMedida: string;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 12, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  descuento: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ name: 'base_impuesto', type: 'decimal', precision: 12, scale: 2, default: 0 })
  baseImpuesto: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 19 })
  porcentajeImpuesto: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  impuesto: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Factura, (factura) => factura.id)
  @JoinColumn({ name: 'factura_id' })
  factura: Factura;

  @Column({ name: 'factura_id' })
  facturaId: number;

  @ManyToOne(() => Producto, { nullable: true })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id', nullable: true })
  productoId: number;
}