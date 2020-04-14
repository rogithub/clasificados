import { Varios } from '../../models/varios';
import { SearchData } from '../../models/searchData';
import { ResultSet } from '../../models/resultSet';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';

export class Model {

    public hasCity: KnockoutObservable<boolean>;
    public list: KnockoutObservableArray<Varios>;    
    private api: Api;

    constructor(ko: KnockoutStatic, $: JQueryStatic, api: Api) {
        this.api = api;
        this.list = ko.observableArray<Varios>();
        this.hasCity = ko.observable<boolean>(false);
    }

    public load(m: ResultSet<Varios[]>): void {
        const self = this;
        self.hasCity(true);
        self.list(m.payload);
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
        let model = await self.api.post<ResultSet<Varios[]>>(url, data);
        self.load(model);
    }
}