import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('historial_tasaciones')
export class Tasacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;

  @Column({ name: 'valor_tasacion', type: 'decimal', precision: 12, scale: 2 })
  valorTasacion: number;

  @Column({ name: 'tendencia', length: 20 }) // ALZA, BAJA, ESTABLE
  tendencia: string;

  @CreateDateColumn({ name: 'fecha_tasacion' })
  fechaTasacion: Date;
}
