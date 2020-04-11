

export class Model {
    private ko: KnockoutStatic;
    public template: KnockoutObservable<string>;
    public data: KnockoutObservable<any>;

    constructor(ko: KnockoutStatic, template: string, data: any) {
        this.ko = ko;
        this.template = this.ko.observable<string>(template);
        this.data = this.ko.observable<any>(data);
    }
}

