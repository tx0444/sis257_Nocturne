import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 20, nullable: true })
  nit: string;

  @Column({ length: 20, nullable: true })
  ci: string;

  @Column({ length: 255, nullable: true })
  direccion: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ name: 'puntos_fidelidad', type: 'int', default: 0 })
  puntosFidelidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  credito: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => Venta, (venta) => venta.cliente)
  ventas: Venta[];
}