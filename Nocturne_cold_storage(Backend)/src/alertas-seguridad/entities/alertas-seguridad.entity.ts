import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('alertas_seguridad')
export class AlertaSeguridad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Column({ name: 'tipo_alerta', length: 50 }) // FLUCTUACION_TEMPERATURA, INTENTO_ACCESO, PRODUCTO_RARO
  tipoAlerta: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'boolean', default: false })
  leido: boolean;

  @CreateDateColumn({ name: 'fecha_alerta' })
  fechaAlerta: Date;
}
