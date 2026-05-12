import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TipoMetodo {
  EFECTIVO = 'efectivo',
  TARJETA_DEBITO = 'tarjeta_debito',
  TARJETA_CREDITO = 'tarjeta_credito',
  TRANSFERENCIA = 'transferencia',
  NEQUI = 'nequi',
  DAVIPLATA = 'daviplata',
  PAYPAL = 'paypal',
  MERCADO_PAGO = 'mercado_pago',
  QR = 'qr',
  CONTRA_ENTREGA = 'contra_entrega',
  MIXTO = 'mixto',
}

export enum EstadoMetodoPago {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity('metodos_pago')
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ type: 'enum', enum: TipoMetodo, unique: true })
  tipo: TipoMetodo;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'comision_porcentaje', type: 'decimal', precision: 5, scale: 2, default: 0 })
  comisionPorcentaje: number;

  @Column({ name: 'comision_fija', type: 'decimal', precision: 10, scale: 2, default: 0 })
  comisionFija: number;

  @Column({ name: 'tiempo_confirmacion', length: 50, nullable: true })
  tiempoConfirmacion: string;

  @Column({ type: 'boolean', default: true })
  requiereVerificacion: boolean;

  @Column({ type: 'boolean', default: true })
  permiteParcial: boolean;

  @Column({ type: 'boolean', default: false })
  activo: boolean;

  @Column({ type: 'enum', enum: EstadoMetodoPago, default: EstadoMetodoPago.ACTIVO })
  estado: EstadoMetodoPago;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}