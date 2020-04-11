import { ObjectLiteral } from '../../shared/objectLiteral';
import { TableColumn } from '../../shared/tableColumn';
import { Model as PaginationModel } from '../../components/pagination/model';
import { Model as SearchFieldModel } from '../../components/searchField/model';
import { Api } from '../../shared/api';
import { ResultSet } from '../../models/resultSet';
import { SearchData, OrderCol } from '../../models/searchData';
import { SortOrder } from '../../constants/sortOrder';
import { SortableHeaderCell } from '../../models/sortableHeaderCell';


export class ColumnModel {
    public info: TableColumn;
    public model: ObjectLiteral;

    constructor(info: TableColumn) {
        this.info = info;
        this.model = info.getHeadData(info.header);
    }
}

export class Model<T> {
    private api: Api;
    public searchModel: SearchFieldModel;
    public searchUrl: string;
    public sorting: KnockoutComputed<OrderCol[]>;
    public pagination: PaginationModel;

    public cols: KnockoutObservableArray<ColumnModel>;
    public rows: KnockoutObservableArray<ObjectLiteral>;
    protected ko: KnockoutStatic;

    constructor(ko: KnockoutStatic, api: Api, searchUrl: string, cols: TableColumn[]) {
        this.ko = ko;
        this.cols = this.ko.observableArray<ColumnModel>([]);
        this.rows = this.ko.observableArray<ObjectLiteral>([]);

        this.api = api;
        this.searchUrl = searchUrl;
        this.cols(this.ko.utils.arrayMap(cols, c => new ColumnModel(c)));
        this.searchModel = new SearchFieldModel(ko);
        this.pagination = new PaginationModel(ko);

        this.sorting = this.ko.pureComputed<OrderCol[]>(() => {
            let cols = this.ko.utils.arrayFilter(this.cols(), c => {
                if (c.model instanceof SortableHeaderCell === false) return false;
                let item = c.model as SortableHeaderCell;
                return item.order() !== SortOrder.None;
            });

            return this.ko.utils.arrayMap(cols, (c: ColumnModel): OrderCol => {
                let item = c.model as SortableHeaderCell;
                return {
                    col: c.info.header["rowKey"],
                    order: item.order() === SortOrder.Asc ? 0 : 1
                }
            });
        });

        this.pagination.page.subscribe(this.load);
        this.pagination.pageSize.subscribe(this.load);
        this.searchModel.searchText.subscribe(this.load);
        this.sorting.subscribe(this.load);
    }

    load = async () => {

        let data: SearchData = {
            limit: this.pagination.pageSize(),
            offset: (this.pagination.page() - 1),
            columns: this.sorting(),
            pattern: this.searchModel.searchText()
        }

        let set = await this.api.post<ResultSet<T[]>>(this.searchUrl, data);
        this.pagination.totalRows(set.totalRows);
        this.rows(set.payload);
    }
}
