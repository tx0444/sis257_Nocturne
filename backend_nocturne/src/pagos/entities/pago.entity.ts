import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';
import { MetodoPago } from '../../metodos-pago/entities/metodo-pago.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  monto: number;

  @Column({ name: 'monto_recibido', type: 'decimal', precision: 12, scale: 2, default: 0 })
  montoRecibido: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  cambio: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ name: 'comprobante_referencia', type: 'varchar', length: 255, nullable: true })
  comprobanteReferencia: string | null;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  // Relaciones
  @ManyToOne(() => Venta, (venta) => venta.pagos)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ name: 'venta_id' })
  ventaId: number;

  @ManyToOne(() => MetodoPago, (metodoPago) => metodoPago.pagos)
  @JoinColumn({ name: 'metodo_pago_id' })
  metodoPago: MetodoPago;

  @Column({ name: 'metodo_pago_id' })
  metodoPagoId: number;
}
