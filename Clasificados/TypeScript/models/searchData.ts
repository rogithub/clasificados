
export interface OrderCol {
    col: string;
    order: number;
}

export interface SearchData {
    limit: number;
    offset: number;
    ciudadId: number;
    pattern?: string;
    columns?: OrderCol[];
}