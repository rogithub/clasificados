export interface Ciudad {
    id: number;
    estadoId: number;
    nombre: string;
    url: string;
}

export interface Estado {
    id: number;
    nombre: string;
    url: string;
    ciudades: Ciudad[];
}

export interface Lugar {
    estado: Estado;
    ciudad: Ciudad;
}