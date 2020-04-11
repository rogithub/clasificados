export enum VentaRenta {
    Venta,
    Renta
};
export enum CasaTerreno {
    Casa,
    Terreno
};
export interface Inmueble {
    id: number;
    estadoId: number;
    ciudadId: number;
    descripcion: string;
    fecha: Date;
    activo: boolean;
    ventaRenta: VentaRenta;
    casaTerreno: CasaTerreno;
}