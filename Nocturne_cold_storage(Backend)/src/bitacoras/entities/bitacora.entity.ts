import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export enum AccionBitacora {
  CREAR = 'crear',
  ACTUALIZAR = 'actualizar',
  ELIMINAR = 'eliminar',
  LOGIN = 'login',
  LOGOUT = 'logout',
  EXPORTAR = 'exportar',
  IMPORTAR = 'importar',
}

@Entity('bitacoras')
export class Bitacora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'simple-enum', enum: AccionBitacora })
  accion: AccionBitacora;

  @Column({ name: 'nombre_tabla', length: 100 })
  nombreTabla: string;

  @Column({ name: 'id_registro', nullable: true })
  idRegistro: number;

  @Column({ type: 'json', nullable: true })
  datosAnteriores: any;

  @Column({ type: 'json', nullable: true })
  datosNuevos: any;

  @Column({ length: 45 })
  ip: string;

  @Column({ length: 500, nullable: true })
  userAgent: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_accion' })
  fechaAccion: Date;

  // Relaciones
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: number;
}