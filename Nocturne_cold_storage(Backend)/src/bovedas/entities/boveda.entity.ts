import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('bovedas_custodia')
export class Boveda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;

  @Column({ name: 'numero_serie', length: 50, unique: true })
  numeroSerie: string;

  @Column({ name: 'ubicacion_fisica', length: 100 })
  ubicacionFisica: string;

  @Column({ name: 'estado', length: 50, default: 'EN_BOVEDA' }) // EN_BOVEDA, RETIRADA, EN_TRANSITO
  estado: string;

  @CreateDateColumn({ name: 'fecha_adquisicion' })
  fechaAdquisicion: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
