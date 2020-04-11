
export class Component {
    private ko: KnockoutStatic;

    constructor(ko: KnockoutStatic) {
        this.ko = ko;
    }


    public register<T>(name: string, template: string, factory: (params: any, componentInfo: KnockoutComponentTypes.ComponentInfo) => T): void {
        const self = this;

        self.ko.components.register(name, {
            viewModel: { createViewModel: factory },
            template: template
        });
    }
}
