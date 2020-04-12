export interface Url {
    navigate(url: string): void;
    getLocation(): string;
    getUrlParameter(sParam: string): string;
}