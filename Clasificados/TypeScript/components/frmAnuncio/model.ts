import { Estado, Ciudad, Lugar } from '../../models/lugar';
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

enum AnuncioEstatus {
    Editando,
    Revisando
}

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
    public templateName: KnockoutComputed<string>;
    public estatus: KnockoutObservable<AnuncioEstatus>;
    public lugarSeleccionado: KnockoutComputed<string>;

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
        this.estatus = ko.observable<AnuncioEstatus>(AnuncioEstatus.Editando);

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

        this.templateName = ko.pureComputed<string>(() => {

            switch (self.tipo.value()) {
                case TipoAnuncio.Empleo:
                    return "default-row-template";
                case TipoAnuncio.RentaCasa:
                    return "inmueble-row-template";
                case TipoAnuncio.RentaTerreno:
                    return "inmueble-row-template";
                case TipoAnuncio.VentaCasa:
                    return "inmueble-row-template";
                case TipoAnuncio.VentaTerreno:
                    return "inmueble-row-template";
                case TipoAnuncio.Vehiculo:
                    return "vehiculo-row-template";
                case TipoAnuncio.Varios:
                    return "default-row-template";
                default:
                    return "empty-row-template";
            }

        }, self);

        this.lugarSeleccionado = ko.pureComputed<string>(() => {
            if (self.estado.value() === null || self.estado.value() === undefined ||
                self.ciudad.value() === null || self.ciudad.value() === undefined ||
                self.estado.value() <= 0 || self.ciudad.value() <= 0
            )
                return "";

            let e = ko.utils.arrayFilter(self.estados(), it => {
                return it.id === self.estado.value();
            });

            if (e.length !== 1) {
                return "";
            }

            let c = ko.utils.arrayFilter(e[0].ciudades, it => {
                return it.id === self.ciudad.value();
            });

            if (c.length !== 1) {
                return "";
            }

            return `${c[0].nombre}, ${e[0].nombre}.`;
        }, self);

    }

    public async load(): Promise<void> {
        const self = this;
        let url = urls.api.lugares.getAll;
        let items = await this.api.get<Estado[]>(url);
        self.estados(items);


        url = `${urls.api.lugares.base}`;
        let model = await self.api.get<Lugar>(url);
        if (model.hasValue) {
            self.estado.value(model.estado.id);
            self.ciudad.value(model.ciudad.id);
        }
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
                    año: parseInt(self.año.value().toString()),
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

    public async onSiguiente(): Promise<void> {
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

        self.estatus(1);
    }

    public async onSave(): Promise<void> {
        const self = this;

        let url = self.getSaveUrl();
        let model = self.getModel();

        await this.api.post<any>(`${url}`, model);

        // Guardar lugar
        url = urls.api.lugares.save;
        await this.api.post<any>(`${url}/${self.ciudad.value()}`, {});

        self.indexRedirect();
    }

    public formatDate = (): string => {
        let d = new Date(Date.now());
        let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiémbre", "octubre", "noviémbre", "diciembre"];
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let strMinutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + strMinutes + ' ' + ampm;

        return `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getFullYear()}. ${strTime}`;
    }

    public indexRedirect = () => {
        const self = this;
        let url = self.getRedirectUrl();
        self.url.navigate(url);
    }
}