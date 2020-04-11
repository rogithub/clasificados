
export interface OrderCol {
    col: string;
    order: number;
}

export interface SearchData {
    limit: number;
    offset: number;
    pattern?: string;
    columns?: OrderCol[];
}