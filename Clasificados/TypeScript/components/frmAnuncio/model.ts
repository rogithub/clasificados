import { Estado, Ciudad } from '../../models/lugar';
import { TipoAnuncio, AnunciosDescripcion } from '../../models/tiposAnuncio';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';
import { PositiveNumber } from '../../validators/positiveNumber';
import { RequiredString } from '../../validators/requiredString';
import { ObsExtension, ObsFrm, Obs } from 'valiko';

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

    public async onSave(): Promise<void> {
        const self = this;
        let isValid = await self.validate();
        if (isValid === false) return;

        let url = urls.api.lugares.save;
        let model = {};

        await this.api.post<void>(`${url}/${self.ciudad.value()}`, model);
        self.indexRedirect();
    }

    public indexRedirect = () => {
        const self = this;
        let url = urls.web.home.index;
        if (self.url.getUrlParameter("redirect").length > 0) {
            url = self.url.getUrlParameter("redirect");
        }
        self.url.navigate(url);
    }
}