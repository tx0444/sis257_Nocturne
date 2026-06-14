import { compare, genSalt, hash } from 'bcryptjs';
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
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Rol } from '../../roles/entities/rol.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import { Compra } from '../../compras/entities/compra.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 50, unique: true })
  usuario: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  estado: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', type: 'timestamp', nullable: true })
  fechaEliminacion: Date;

  // Relaciones
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ name: 'rol_id' })
  rolId: number;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];

  @OneToMany(() => Compra, (compra) => compra.usuario)
  compras: Compra[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const isHashed = this.password.length === 60 && this.password.startsWith('$2');
      if (!isHashed) {
        const salt = await genSalt();
        this.password = await hash(this.password, salt);
      }
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return compare(plainPassword, this.password);
  }
}
