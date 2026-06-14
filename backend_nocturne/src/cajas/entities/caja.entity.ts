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
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('cajas')
export class Caja {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id', type: 'integer', nullable: true })
  usuarioId: number | null;

  @Column({ name: 'monto_inicial', type: 'decimal', precision: 10, scale: 2, default: 0 })
  montoInicial: number;

  @Column({ name: 'monto_final', type: 'decimal', precision: 10, scale: 2, nullable: true })
  montoFinal: number | null;

  @Column({ type: 'varchar', length: 20, default: 'Abierta' })
  estado: 'Abierta' | 'Cerrada';

  @Column({ name: 'fecha_apertura', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaApertura: Date;

  @Column({ name: 'fecha_cierre', type: 'timestamp', nullable: true })
  fechaCierre: Date | null;

  @Column({ name: 'ventas_efectivo', type: 'decimal', precision: 10, scale: 2, default: 0 })
  ventasEfectivo: number;

  @Column({ name: 'ventas_qr', type: 'decimal', precision: 10, scale: 2, default: 0 })
  ventasQr: number;

  @Column({ name: 'ventas_tarjeta', type: 'decimal', precision: 10, scale: 2, default: 0 })
  ventasTarjeta: number;

  @Column({ name: 'total_caja', type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalCaja: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  diferencia: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp', nullable: true })
  fechaEliminacion: Date | null;
}
