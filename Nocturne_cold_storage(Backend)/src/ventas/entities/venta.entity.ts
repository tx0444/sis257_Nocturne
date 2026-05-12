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
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { DetalleVenta } from '../../detalles-venta/entities/detalle-venta.entity';
import { MovimientoInventario } from '../../movimientos-inventario/entities/movimiento-inventario.entity';

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
  QR = 'qr',
  MIXTO = 'mixto',
}

export enum EstadoVenta {
  PENDIENTE = 'pendiente',
  EN_CAMINO = 'en_camino',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
  ANULADA = 'anulada',
}

export enum TipoEntrega {
  DOMICILIO = 'domicilio',
  RECOJO = 'recojo',
}

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_factura', length: 50, unique: true })
  numeroFactura: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  descuento: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  impuesto: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  @Column({ name: 'monto_entregado', type: 'decimal', precision: 12, scale: 2, nullable: true })
  montoEntregado: number;

  @Column({ name: 'cambio_devuelto', type: 'decimal', precision: 12, scale: 2, nullable: true })
  cambioDevuelto: number;

  @Column({ type: 'enum', enum: MetodoPago })
  metodoPago: MetodoPago;

  @Column({ type: 'enum', enum: EstadoVenta, default: EstadoVenta.COMPLETADA })
  estado: EstadoVenta;

  @Column({ name: 'serie', length: 20, nullable: true })
  serie: string;

  @Column({ name: 'numero_autorizacion', length: 100, nullable: true })
  numeroAutorizacion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'fecha_venta' })
  fechaVenta: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id', nullable: true })
  clienteId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
  detalles: DetalleVenta[];

  @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.venta)
  movimientos: MovimientoInventario[];

  // Nuevos campos para delivery
  @Column({ name: 'tipo_entrega', type: 'enum', enum: TipoEntrega, default: TipoEntrega.RECOJO })
  tipoEntrega: TipoEntrega;

  @Column({ name: 'direccion_entrega', type: 'text', nullable: true })
  direccionEntrega: string;

  @Column({ name: 'telefono_entrega', length: 20, nullable: true })
  telefonoEntrega: string;

  @Column({ name: 'referencia_entrega', type: 'text', nullable: true })
  referenciaEntrega: string;
}