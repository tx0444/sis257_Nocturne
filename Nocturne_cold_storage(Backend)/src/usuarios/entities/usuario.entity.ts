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
import { Rol } from '../../roles/entities/rol.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import { MovimientoInventario } from '../../movimientos-inventario/entities/movimiento-inventario.entity';
import { Bitacora } from '../../bitacoras/entities/bitacora.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50, unique: true, nullable: true })
  nickname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 255, nullable: true })
  direccion: string;

  @Column({ name: 'foto_url', length: 500, nullable: true })
  fotoUrl: string;

  @Column({ name: 'ultimo_login', type: 'timestamp', nullable: true })
  ultimoLogin: Date;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ name: 'rol_id' })
  rolId: number;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];

  @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.usuario)
  movimientos: MovimientoInventario[];

  @OneToMany(() => Bitacora, (bitacora) => bitacora.usuario)
  bitacoras: Bitacora[];
}