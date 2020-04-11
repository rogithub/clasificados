import { SortOrder } from '../constants/sortOrder';

export class SortableHeaderCell {
    public order: KnockoutObservable<SortOrder>;
    public title: KnockoutObservable<string>;
    private ko: KnockoutStatic;

    constructor(ko: KnockoutStatic, title: string = "") {
        this.ko = ko;
        this.order = this.ko.observable<SortOrder>(SortOrder.None);
        this.title = this.ko.observable<string>(title);
    }

    public changeOrder = (): void => {
        switch (this.order()) {
            case SortOrder.None:
                this.order(SortOrder.Asc);
                return;
            case SortOrder.Asc:
                this.order(SortOrder.Desc);
                return;
            case SortOrder.Desc:
                this.order(SortOrder.None);
                return;
        }
    }
}
