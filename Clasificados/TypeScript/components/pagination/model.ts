import range from '../../constants/range';

export class Model {
    private ko: KnockoutStatic;

    public pageSizes: KnockoutObservableArray<number>;
    public pageSize: KnockoutObservable<number>;
    public page: KnockoutObservable<number>;
    public totalRows: KnockoutObservable<number>;
    public list: KnockoutComputed<number[]>;
    public jumpToPage: KnockoutObservable<string>;

    constructor(ko: KnockoutStatic, page: number = 1, pageSizes: number[] = [10, 20, 50, 100], totalRows: number = 0) {
        this.ko = ko;
        this.page = this.ko.observable<number>(page);
        this.pageSizes = this.ko.observableArray<number>(pageSizes);
        this.pageSize = this.ko.observable<number>(pageSizes[0]);
        this.totalRows = this.ko.observable<number>(totalRows);
        this.jumpToPage = this.ko.observable<string>(page.toString());

        const self = this;
        self.list = self.ko.pureComputed<number[]>(() => {
            if (self.totalRows() <= 0) return [];

            let pageCount = self.totalRows() / self.pageSize();
            let remainder = self.totalRows() % self.pageSize();

            if (remainder > 0) {
                pageCount += 1;
            }

            return range(1, pageCount, 1);
        }, self);

        this.jumpToPage.subscribe(newPage => {
            let tryNewPage = parseInt(newPage);
            if (isNaN(tryNewPage) || self.list().indexOf(tryNewPage) === -1 || self.page() === tryNewPage) {
                return;
            }

            self.page(tryNewPage);
        });

        this.page.subscribe(newPage => {
            self.jumpToPage(newPage.toString());
        });

        this.pageSize.subscribe(() => {
            self.page(1);
        });
    }
}
