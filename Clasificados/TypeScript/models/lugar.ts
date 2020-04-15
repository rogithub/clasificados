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
    hasValue: boolean;
    estado: Estado;
    ciudad: Ciudad;
}