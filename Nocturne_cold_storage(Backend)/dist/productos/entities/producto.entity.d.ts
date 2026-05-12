import { Categoria } from '../../categorias/entities/categorias.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';
import { Inventario } from '../../inventarios/entities/inventario.entity';
import { DetalleVenta } from '../../detalles-venta/entities/detalle-venta.entity';
export declare class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    gradoAlcoholico: number;
    requiereFrio: boolean;
    precioCompra: number;
    precioVenta: number;
    unidad: string;
    codigoBarras: string;
    imagenUrl: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoria: Categoria;
    categoriaId: number;
    proveedor: Proveedor;
    proveedorId: number;
    inventarios: Inventario[];
    detallesVenta: DetalleVenta[];
}
