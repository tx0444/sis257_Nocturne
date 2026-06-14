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

@Entity('auditorias')
export class Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @Column({ name: 'usuario_nombre', length: 255 })
  usuarioNombre: string;

  @Column({ length: 50 })
  accion: string; // 'CREAR', 'EDITAR', 'ELIMINAR'

  @Column({ length: 100 })
  tabla: string; // 'VENTAS', 'CLIENTES'

  @Column({ name: 'registro_id', type: 'integer', nullable: true })
  registroId: number;

  @Column({ type: 'text', nullable: true })
  detalle: string;

  // Relación opcional con el usuario
  @ManyToOne(() => Usuario, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id', type: 'integer', nullable: true })
  usuarioId: number | null;
}
