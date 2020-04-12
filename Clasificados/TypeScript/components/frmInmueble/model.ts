import { ObsExtension, ObsFrm } from 'valiko';
import { Inmueble, VentaRenta, CasaTerreno } from '../../models/inmueble';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';
import { RequiredString } from '../../validators/requiredString';

export class Model extends ObsFrm {

    public descripcion: ObsExtension<string>;
    public ventaRenta: ObsExtension<VentaRenta>;
    public casaTerreno: ObsExtension<CasaTerreno>;
    public fecha: KnockoutObservable<Date>;
    public id: KnockoutObservable<number>;
    public ciudadId: KnockoutObservable<number>;
    public activo: KnockoutObservable<boolean>;

    private api: Api;
    private url: Url;
    public isNew: KnockoutComputed<boolean>;

    constructor(ko: KnockoutStatic, api: Api, url: Url) {
        super(ko);
        this.url = url;
        this.api = api;
        this.descripcion = this.add<string>().with(new RequiredString());
        this.ventaRenta = this.add<VentaRenta>().with();
        this.casaTerreno = this.add<CasaTerreno>().with();
        this.activo = ko.observable<boolean>(true);
        this.fecha = ko.observable<Date>(new Date(Date.now()));
        this.ciudadId = ko.observable<number>(0);
        this.id = ko.observable<number>(0);
        const self = this;
        this.isNew = ko.pureComputed(() => {
            return self.id() === 0;
        }, self);
    }

    public load(m: Inmueble): void {
        const self = this;
        self.descripcion.value(m.descripcion);
        self.ventaRenta.value(m.ventaRenta);
        self.casaTerreno.value(m.casaTerreno);
        self.activo(m.activo);
        self.fecha(m.fecha);
        self.ciudadId(m.ciudadId);
        self.id(m.id);
    }

    public retrieve(): Inmueble {
        const self = this;
        return {
            descripcion: self.descripcion.value(),
            ventaRenta: self.ventaRenta.value(),
            casaTerreno: self.casaTerreno.value(),
            activo: self.activo(),
            fecha: self.fecha(),
            ciudadId: self.ciudadId(),
            id: self.id()
        }
    }

    public async onSave(): Promise<void> {
        const self = this;
        let isValid = await self.validate();
        if (isValid === false) return;

        let url = urls.api.inmuebles.base;
        let model = self.retrieve();

        let method = self.isNew() ?
            self.api.post :
            self.api.put;

        await method<void>(url, model);
        self.indexRedirect();
    }

    public indexRedirect = () => {
        const self = this;
        self.url.navigate(urls.web.inmuebles.index);
    }

    public async init(guid: string): Promise<void> {
        const self = this;
        let url = `${urls.api.inmuebles.get}/${guid}`;
        let cte = await self.api.get<Inmueble>(url);
        self.load(cte);
    }
}