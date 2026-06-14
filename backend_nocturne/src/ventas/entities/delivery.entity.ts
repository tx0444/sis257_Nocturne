import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Venta } from './venta.entity';

export type EstadoDelivery = 'Pendiente' | 'Preparando' | 'Listo para Entrega' | 'En Camino' | 'Entregado' | 'Cancelado';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Venta, (venta) => venta.delivery, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ name: 'venta_id' })
  ventaId: number;

  @Column({ length: 500 })
  direccion: string;

  @Column({ length: 500, nullable: true })
  referencia: string;

  @Column({ name: 'telefono_contacto', length: 50 })
  telefonoContacto: string;

  @Column({ name: 'costo_delivery', type: 'decimal', precision: 10, scale: 2, default: 10.00 })
  costoDelivery: number;

  @Column({ name: 'latitud', type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitud: number | null;

  @Column({ name: 'longitud', type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitud: number | null;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'Pendiente'
  })
  estado: EstadoDelivery;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @Column({ name: 'fecha_entrega', type: 'timestamp', nullable: true })
  fechaEntrega: Date | null;
}
