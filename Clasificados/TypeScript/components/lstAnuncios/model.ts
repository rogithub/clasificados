import { SearchData } from '../../models/searchData';
import { ResultSet } from '../../models/resultSet';
import { Api } from '../../shared/api';
import { Model as PaginationModel } from '../pagination/model';
import { Model as SearchFieldModel } from '../searchField/model';

export class Model<T> {

    public searchUrl: string;
    public searchModel: SearchFieldModel;
    public pagination: PaginationModel;
    public ciudadId: KnockoutObservable<number>;
    public list: KnockoutObservableArray<T>;
    private api: Api;
    public templateName: KnockoutObservable<string>;

    constructor(ko: KnockoutStatic, api: Api, searchUrl: string, ciudadId: number, template: string) {
        this.api = api;
        this.list = ko.observableArray<T>();
        this.ciudadId = ko.observable<number>(ciudadId);
        this.searchModel = new SearchFieldModel(ko);
        this.pagination = new PaginationModel(ko, 1, [100]);
        this.searchUrl = searchUrl;

        this.pagination.page.subscribe(this.change);
        this.pagination.pageSize.subscribe(this.change);
        this.searchModel.searchText.subscribe(this.change);
        this.change();

        this.templateName = ko.observable<string>(template);
    }

    public change = async () => {
        const self = this;
        if (self.ciudadId() < 0) {
            return;
        }

        let data: SearchData = {
            ciudadId: self.ciudadId(),
            limit: this.pagination.pageSize(),
            offset: (this.pagination.page() - 1),
            pattern: this.searchModel.searchText()
        }

        let set = await this.api.post<ResultSet<T[]>>(self.searchUrl, data);
        this.pagination.totalRows(set.totalRows);
        this.list(set.payload);
    }

    public formatDate = (date: string): string => {
        let d = new Date(date);
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
}