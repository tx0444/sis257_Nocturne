import { Categoria } from '../../categorias/entities/categorias.entity';
import { Producto } from '../../productos/entities/producto.entity';
export declare enum TipoDescuento {
    PORCENTAJE = "PORCENTAJE",
    MONTO_FIJO = "MONTO_FIJO"
}
export declare class Promocion {
    id: number;
    nombre: string;
    descripcion: string;
    tipoDescuento: TipoDescuento;
    valorDescuento: number;
    fechaInicio: Date;
    fechaFin: Date;
    activa: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoria: Categoria;
    categoriaId: number;
    producto: Producto;
    productoId: number;
}
