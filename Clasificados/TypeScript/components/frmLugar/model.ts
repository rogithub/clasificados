import { Estado, Ciudad } from '../../models/lugar';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';
import { PositiveNumber } from '../../validators/positiveNumber';
import { ObsExtension, ObsFrm, Obs } from 'valiko';

export class Model extends ObsFrm {

    public estados: KnockoutObservableArray<Estado>;
    public estado: ObsExtension<number>;
    public ciudad: ObsExtension<number>;
    public ciudades: KnockoutComputed<Ciudad[]>;

    private api: Api;
    private url: Url;

    constructor(ko: KnockoutStatic, api: Api, url: Url) {
        super(ko);
        this.url = url;
        this.api = api;
        this.estados = ko.observableArray<Estado>();
        this.estado = this.add<number>().with(new PositiveNumber());
        this.ciudad = this.add<number>().with(new PositiveNumber());
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