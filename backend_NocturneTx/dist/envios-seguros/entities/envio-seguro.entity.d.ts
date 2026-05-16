import { Venta } from '../../ventas/entities/venta.entity';
export declare class EnvioSeguro {
    id: number;
    venta: Venta;
    ventaId: number;
    agenteAsignado: string;
    latitudActual: number;
    longitudActual: number;
    temperaturaConvoy: number;
    humedadConvoy: number;
    progresoPorcentaje: number;
    estadoLogistico: string;
    fechaInicio: Date;
    updatedAt: Date;
}
