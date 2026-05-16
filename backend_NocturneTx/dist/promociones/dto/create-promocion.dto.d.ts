import { TipoDescuento } from '../entities/promocion.entity';
export declare class CreatePromocionDto {
    nombre: string;
    descripcion?: string;
    tipoDescuento: TipoDescuento;
    valorDescuento: number;
    fechaInicio: Date;
    fechaFin: Date;
    activa?: boolean;
    categoriaId?: number;
    productoId?: number;
}
