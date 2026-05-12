import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inventario } from '../../inventarios/entities/inventario.entity';
import { Venta } from '../../ventas/entities/venta.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export enum TipoMovimiento {
  ENTRADA = 'entrada',
  SALIDA = 'salida',
  MERMA = 'merma',
  AJUSTE = 'ajuste',
}

@Entity('movimientos_inventario')
export class MovimientoInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TipoMovimiento })
  tipo: TipoMovimiento;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'cantidad_antes', type: 'int', nullable: true })
  cantidadAntes: number;

  @Column({ name: 'cantidad_despues', type: 'int', nullable: true })
  cantidadDespues: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioUnitario: number;

  @Column({ length: 255, nullable: true })
  motivo: string;

  @Column({ name: 'numero_documento', length: 100, nullable: true })
  numeroDocumento: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  // Tipo de origen del movimiento
  @Column({ name: 'origen_tipo', length: 50, nullable: true })
  origenTipo: string; // 'venta', 'compra', 'merma', 'ajuste', 'transferencia'

  @Column({ name: 'origen_id', nullable: true })
  origenId: number;

  @CreateDateColumn({ name: 'fecha_movimiento' })
  fechaMovimiento: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Inventario, (inventario) => inventario.movimientos)
  @JoinColumn({ name: 'inventario_id' })
  inventario: Inventario;

  @Column({ name: 'inventario_id' })
  inventarioId: number;

  @ManyToOne(() => Venta, (venta) => venta.movimientos)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ name: 'venta_id', nullable: true })
  ventaId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: number;
}