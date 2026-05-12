import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 20, unique: true })
  nit: string;

  @Column({ length: 255, nullable: true })
  direccion: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ name: 'persona_contacto', length: 100, nullable: true })
  personaContacto: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => Producto, (producto) => producto.proveedor)
  productos: Producto[];
}