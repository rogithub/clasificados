
export class Model {
    public searchText: KnockoutObservable<string>;
    private ko: KnockoutStatic;

    constructor(ko: KnockoutStatic) {
        this.ko = ko;
        this.searchText = this.ko.observable<string>("");
    }
}