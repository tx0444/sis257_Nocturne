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
import { Venta } from '../../ventas/entities/venta.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export enum TipoFactura {
  FACTURA = 'factura',
  NOTA_CREDITO = 'nota_credito',
  NOTA_DEBITO = 'nota_debito',
  TICKET = 'ticket',
  COTIZACION = 'cotizacion',
}

export enum EstadoFactura {
  BORRADOR = 'borrador',
  EMITIDA = 'emitida',
  ANULADA = 'anulada',
  RECHAZADA = 'rechazada',
  VALIDADA = 'validada',
}

export enum OrigenFactura {
  VENTA = 'venta',
  DEVOLUCION = 'devolucion',
  AJUSTE = 'ajuste',
  COTIZACION = 'cotizacion',
}

@Entity('facturas')
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_factura', length: 50, unique: true })
  numeroFactura: string;

  @Column({ name: 'prefijo', length: 10, nullable: true })
  prefijo: string;

  @Column({ name: 'numero_consecutivo', length: 20 })
  numeroConsecutivo: string;

  @Column({ type: 'enum', enum: TipoFactura, default: TipoFactura.FACTURA })
  tipo: TipoFactura;

  @Column({ type: 'enum', enum: EstadoFactura, default: EstadoFactura.BORRADOR })
  estado: EstadoFactura;

  @Column({ type: 'enum', enum: OrigenFactura })
  origen: OrigenFactura;

  // Datos cliente
  @Column({ name: 'nombre_cliente', length: 100 })
  nombreCliente: string;

  @Column({ name: 'nit_cliente', length: 20, nullable: true })
  nitCliente: string;

  @Column({ name: 'direccion_cliente', type: 'text', nullable: true })
  direccionCliente: string;

  @Column({ name: 'telefono_cliente', length: 20, nullable: true })
  telefonoCliente: string;

  @Column({ name: 'email_cliente', length: 100, nullable: true })
  emailCliente: string;

  // Totales
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  descuento: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  subtotalNeto: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  baseImpuesto: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  impuesto: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 19 })
  porcentajeImpuesto: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total: number;

  // Facturación electrónica (Colombia DIAN)
  @Column({ name: 'cufe', length: 100, nullable: true })
  cufe: string;

  @Column({ name: 'fecha_emision_dian', type: 'timestamp', nullable: true })
  fechaEmisionDian: Date;

  @Column({ name: 'qr_code', type: 'text', nullable: true })
  qrCode: string;

  @Column({ name: 'url_verificacion', type: 'text', nullable: true })
  urlVerificacion: string;

  // Anulación
  @Column({ name: 'motivo_anulacion', type: 'text', nullable: true })
  motivoAnulacion: string;

  @Column({ name: 'fecha_anulacion', type: 'timestamp', nullable: true })
  fechaAnulacion: Date;

  // Notas adicionales
  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'terminos_condiciones', type: 'text', nullable: true })
  terminosCondiciones: string;

  @Column({ name: 'fecha_vencimiento', type: 'timestamp', nullable: true })
  fechaVencimiento: Date;

  @CreateDateColumn({ name: 'fecha_emision' })
  fechaEmision: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Venta, { nullable: true })
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ name: 'venta_id', nullable: true })
  ventaId: number;

  @ManyToOne(() => Cliente, { nullable: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id', nullable: true })
  clienteId: number;

  @ManyToOne(() => Factura, { nullable: true })
  @JoinColumn({ name: 'factura_relacionada_id' })
  facturaRelacionada: Factura;

  @Column({ name: 'factura_relacionada_id', nullable: true })
  facturaRelacionadaId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: number;
}