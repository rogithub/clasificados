export enum TipoAnuncio {
    Empleo,
    VentaCasa,
    VentaTerreno,
    RentaCasa,
    RentaTerreno,
    Vehiculo,
    Varios
}

export interface AnunciosDescripcion {
    tipo: TipoAnuncio;
    desc: string;
}