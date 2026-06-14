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
  OneToOne,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetalleVenta } from '../../detalles-venta/entities/detalle-venta.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import { Delivery } from './delivery.entity';

export type EstadoVenta = 'Pendiente' | 'Confirmada' | 'Entregada' | 'Anulada';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'Confirmada',
  })
  estado: EstadoVenta;

  @Column({ name: 'comprobante_qr', type: 'varchar', length: 500, nullable: true })
  comprobanteQr: string | null;

  @Column({ name: 'direccion_entrega', type: 'varchar', length: 500, nullable: true })
  direccionEntrega: string | null;

  @Column({ name: 'tipo_entrega', type: 'varchar', length: 50, default: 'Tienda' })
  tipoEntrega: string; // 'Tienda' | 'Delivery'

  @OneToOne(() => Delivery, (delivery) => delivery.venta, { nullable: true, cascade: true })
  delivery: Delivery;

  @Column({ name: 'caja_id', type: 'integer', nullable: true })
  cajaId: number | null;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp', nullable: true })
  fechaEliminacion: Date;

  // Relaciones
  @ManyToOne(() => Cliente, (cliente) => cliente.ventas, { nullable: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id', type: 'integer', nullable: true })
  clienteId: number | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.ventas)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles: DetalleVenta[];

  @OneToMany(() => Pago, (pago) => pago.venta)
  pagos: Pago[];
}
