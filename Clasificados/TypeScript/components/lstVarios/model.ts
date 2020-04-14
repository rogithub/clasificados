import { Varios } from '../../models/varios';
import { SearchData } from '../../models/searchData';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';

export class Model {

    public visible: KnockoutObservable<boolean>;
    public list: KnockoutObservableArray<Varios>;
    private url: Url;
    private api: Api;

    constructor(ko: KnockoutStatic, $: JQueryStatic, api: Api, url: Url) {
        this.api = api;
        this.url = url;
        this.list = ko.observableArray<Varios>();
        this.visible = ko.observable<boolean>(false);
    }

    public load(m: Varios[]): void {
        const self = this;
        self.list(m);
        self.visible(true);
    }

    public async init(ciudadId: number): Promise<void> {
        const self = this;

        if (ciudadId < 0) {
            return;
        } 

        let url = `${urls.api.varios.search}`;
        let data : SearchData = {
            limit: 100,
            offset: 0,
            ciudadId: ciudadId
        };
        let model = await self.api.post<Varios[]>(url, data);
        self.load(model);
    }
}