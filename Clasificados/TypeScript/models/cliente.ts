export interface Cliente {
    id: number;
    guid: string;
    facturacionGuid: string;
    contacto: string;
    empresa: string;
    telefono: string;
    email: string;
    domicilio: string;
    fechaCreado: Date;
    activo: boolean;
}