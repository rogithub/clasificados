import { Estado, Ciudad } from '../../models/lugar';
import { TipoAnuncio, AnunciosDescripcion } from '../../models/tiposAnuncio';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';
import { PositiveNumber } from '../../validators/positiveNumber';
import { RequiredString } from '../../validators/requiredString';
import { ObsExtension, ObsFrm, Obs } from 'valiko';

import { Empleo } from '../../models/empleo';
import { Inmueble, CasaTerreno, VentaRenta } from '../../models/inmueble';
import { Varios } from '../../models/varios';
import { Vehiculo } from '../../models/vehiculo';

export class Model extends ObsFrm {

    public tipoDesc: KnockoutComputed<string>;
    public letrasRestantes: KnockoutComputed<number>;
    public estados: KnockoutObservableArray<Estado>;
    public estado: ObsExtension<number>;
    public ciudad: ObsExtension<number>;
    public descripcion: ObsExtension<string>;
    public ciudades: KnockoutComputed<Ciudad[]>;
    public tipo: ObsExtension<TipoAnuncio>;
    public tipos: KnockoutObservableArray<AnunciosDescripcion>;

    public marca: ObsExtension<string>;
    public modelo: ObsExtension<string>;
    public año: ObsExtension<number>;

    private api: Api;
    private url: Url;

    constructor(ko: KnockoutStatic, api: Api, url: Url) {
        super(ko);
        this.url = url;
        this.api = api;
        this.estados = ko.observableArray<Estado>();
        this.descripcion = this.add<string>().with(new RequiredString());
        this.estado = this.add<number>().with(new PositiveNumber());
        this.ciudad = this.add<number>().with(new PositiveNumber());
        this.tipo = this.add<TipoAnuncio>().with(new PositiveNumber());

        this.año = this.add<number>();
        this.marca = this.add<string>();
        this.modelo = this.add<string>();

        this.tipos = ko.observableArray<AnunciosDescripcion>([
            { tipo: TipoAnuncio.VentaCasa, desc: "Venta de casa o departamento" },
            { tipo: TipoAnuncio.VentaTerreno, desc: "Venta de terrenos" },
            { tipo: TipoAnuncio.Vehiculo, desc: "Venta de vehículos" },
            { tipo: TipoAnuncio.RentaCasa, desc: "Rentar casa o departamento" },
            { tipo: TipoAnuncio.RentaTerreno, desc: "Renta de terrenos" },
            { tipo: TipoAnuncio.Empleo, desc: "Oferta de empleo" },
            { tipo: TipoAnuncio.Varios, desc: "Anuncio en general" },
        ]);

        const self = this;
        this.ciudades = ko.pureComputed<Ciudad[]>(() => {
            if (self.estado.value() === -1) {
                return [];
            }

            let e = ko.utils.arrayFirst(self.estados(), (e) => {
                return e.id === self.estado.value();
            });

            if (e === null || e === undefined || e.ciudades === null || e.ciudades === undefined) {
                return [];
            }

            return e.ciudades;

        }, self);

        this.letrasRestantes = ko.pureComputed<number>(() => {
            let maxSize = 500;

            if (self.descripcion.value() === null || self.descripcion.value() === undefined) {
                return maxSize;
            }

            return maxSize - self.descripcion.value().length;

        }, self);

        this.tipoDesc = ko.pureComputed<string>(() => {
            let maxSize = 500;

            if (self.tipo.value() === null || self.tipo.value() === undefined) {
                return "";
            }

            return self.ko.utils.arrayFirst(self.tipos(), t => {
                return t.tipo === self.tipo.value();
            }).desc;

        }, self);

    }

    public async load(): Promise<void> {
        const self = this;
        let url = urls.api.lugares.getAll;
        let items = await this.api.get<Estado[]>(url);
        self.estados(items);
    }

    private getSaveUrl = () => {
        const self = this;
        switch (self.tipo.value()) {
            case TipoAnuncio.Empleo:
                return urls.api.empleos.save;
            case TipoAnuncio.RentaCasa:
                return urls.api.inmuebles.save;
            case TipoAnuncio.RentaTerreno:
                return urls.api.inmuebles.save;
            case TipoAnuncio.VentaCasa:
                return urls.api.inmuebles.save;
            case TipoAnuncio.VentaTerreno:
                return urls.api.inmuebles.save;
            case TipoAnuncio.Vehiculo:
                return urls.api.vehiculos.save;
            case TipoAnuncio.Varios:
                return urls.api.varios.save;
            default:
                throw new Error("Tipo no válido");
        }
    }

    private getRedirectUrl = () => {
        const self = this;
        switch (self.tipo.value()) {
            case TipoAnuncio.Empleo:
                return urls.web.empleos.index;
            case TipoAnuncio.RentaCasa:
                return urls.web.inmuebles.index;
            case TipoAnuncio.RentaTerreno:
                return urls.web.inmuebles.index;
            case TipoAnuncio.VentaCasa:
                return urls.web.inmuebles.index;
            case TipoAnuncio.VentaTerreno:
                return urls.web.inmuebles.index;
            case TipoAnuncio.Vehiculo:
                return urls.web.vehiculos.index;
            case TipoAnuncio.Varios:
                return urls.web.varios.index;
            default:
                throw new Error("Tipo no válido");
        }
    }

    private getModel = (): Empleo | Inmueble | Vehiculo | Varios => {
        const self = this;
        let now = new Date();

        switch (self.tipo.value()) {
            case TipoAnuncio.Empleo:
                let empleo: Empleo = {
                    id: 0,
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                };
                return empleo;
            case TipoAnuncio.RentaCasa:
                let rentaCasa: Inmueble = {
                    id: 0,
                    casaTerreno: CasaTerreno.Casa,
                    ventaRenta: VentaRenta.Renta,
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                };
                return rentaCasa;
            case TipoAnuncio.RentaTerreno:
                let rentaTerreno: Inmueble = {
                    id: 0,
                    casaTerreno: CasaTerreno.Terreno,
                    ventaRenta: VentaRenta.Renta,
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                };
                return rentaTerreno;
            case TipoAnuncio.VentaCasa:
                let ventaCasa: Inmueble = {
                    id: 0,
                    casaTerreno: CasaTerreno.Casa,
                    ventaRenta: VentaRenta.Venta,
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                };
                return ventaCasa;
            case TipoAnuncio.VentaTerreno:
                let ventaTerreno: Inmueble = {
                    id: 0,
                    casaTerreno: CasaTerreno.Terreno,
                    ventaRenta: VentaRenta.Venta,
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                };
                return ventaTerreno;
            case TipoAnuncio.Vehiculo:
                let vehiculo: Vehiculo = {
                    id: 0,
                    marca: self.marca.value(),
                    modelo: self.modelo.value(),
                    año: self.año.value(),
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                };
                return vehiculo;
            case TipoAnuncio.Varios:
                let varios: Varios = {
                    id: 0,
                    fecha: now,
                    activo: true,
                    ciudadId: self.ciudad.value(),
                    descripcion: self.descripcion.value(),
                }
                return varios;
            default:
                throw new Error("Tipo no válido");
        }
    }

    public async onSave(): Promise<void> {
        const self = this;

        if (self.tipo.value() === TipoAnuncio.Vehiculo) {
            self.año.rules.push(new PositiveNumber());
            self.marca.rules.push(new RequiredString());
            self.modelo.rules.push(new RequiredString());
        } else {
            self.año.rules = [];
            self.marca.rules = []
            self.modelo.rules = []
        }

        let isValid = await self.validate();
        if (isValid === false) return;

        let url = self.getSaveUrl();
        let model = self.getModel();

        await this.api.post<void>(`${url}`, model);
        self.indexRedirect();
    }

    public indexRedirect = () => {
        const self = this;
        let url = self.getRedirectUrl();
        self.url.navigate(url);
    }
}