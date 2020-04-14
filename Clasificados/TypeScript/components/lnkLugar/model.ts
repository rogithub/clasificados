import { Lugar } from '../../models/lugar';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';

export class Model {

    public hasValue: KnockoutComputed<boolean>;
    public ciudad: KnockoutObservable<string>;
    public estado: KnockoutObservable<string>;
    private url: Url;
    private api: Api;

    constructor(ko: KnockoutStatic, $: JQueryStatic, api: Api, url: Url) {
        this.api = api;
        this.url = url;
        this.ciudad = ko.observable<string>();
        this.estado = ko.observable<string>();
        const self = this;
        this.hasValue = ko.pureComputed<boolean>(() => {
            return $.trim(self.estado()).length > 0 &&
                $.trim(self.ciudad()).length > 0;
        }, self);

        self.init();
    }

    public load(m: Lugar): void {
        const self = this;
        self.ciudad(m.ciudad.nombre);
        self.estado(m.estado.nombre);
    }

    public async init(): Promise<void> {
        const self = this;
        let url = `${urls.api.lugares.base}`;
        let model = await self.api.get<Lugar>(url);
        self.load(model);
    }


    public async navigate(): Promise<void> {
        const self = this;
        let url = `${urls.web.home.lugar}?redirect=${self.url.getLocation()}`;
        self.url.navigate(url);
    }
}