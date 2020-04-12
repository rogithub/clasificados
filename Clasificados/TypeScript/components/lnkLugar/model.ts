import { Lugar } from '../../models/lugar';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';

export class Model {

    public hasValue: KnockoutComputed<boolean>;
    public ciudad: KnockoutObservable<string>;
    public estado: KnockoutObservable<string>;

    private api: Api;

    constructor(ko: KnockoutStatic, $: JQueryStatic, api: Api) {
        this.api = api;
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
        self.ciudad(m.ciudad);
        self.estado(m.estado);
    }

    public async init(): Promise<void> {
        const self = this;
        let url = `${urls.api.lugares.base}`;
        let model = await self.api.get<Lugar>(url);
        self.load(model);
    }
}