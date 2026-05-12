import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity('envios_seguros')
export class EnvioSeguro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ name: 'venta_id' })
  ventaId: number;

  @Column({ name: 'agente_asignado', length: 100 })
  agenteAsignado: string;

  @Column({ name: 'latitud_actual', type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitudActual: number;

  @Column({ name: 'longitud_actual', type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitudActual: number;

  @Column({ name: 'temperatura_convoy', type: 'decimal', precision: 5, scale: 2, nullable: true })
  temperaturaConvoy: number;

  @Column({ name: 'humedad_convoy', type: 'decimal', precision: 5, scale: 2, nullable: true })
  humedadConvoy: number;

  @Column({ name: 'progreso_porcentaje', type: 'int', default: 0 })
  progresoPorcentaje: number;

  @Column({ name: 'estado_logistico', length: 50, default: 'FIRMA_NOTARIAL' }) // FIRMA_NOTARIAL, FLETE_BLINDADO, ENTREGADO
  estadoLogistico: string;

  @CreateDateColumn({ name: 'fecha_inicio' })
  fechaInicio: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
