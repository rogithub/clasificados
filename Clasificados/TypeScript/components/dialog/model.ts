export enum PopupSize {
    small = 0,
    medium,
    large
}

export interface DialogOptions<T> {
    model: T;
    contentTemplate: string;
    footerTemplate: string;
    title: string;
    size: PopupSize;
    onHidden?: (options: DialogOptions<T>, e: JQueryEventObject) => void | undefined;
    dialog?: JQuery;
}

export class Model {

    public $: JQueryStatic;
    public ko: KnockoutStatic;
    public jqContainerSelector: string;


    constructor(ko: KnockoutStatic, $: JQueryStatic) {
        this.jqContainerSelector = "ModalBase_Global_Notifications_Container";
        this.$ = $;
        this.ko = ko;
    }

    private getContainer(): JQuery {
        let self = this;
        let container = self.$("#" + self.jqContainerSelector);

        if (container.length === 0) {
            container = self.$("<div id=" + self.jqContainerSelector + "></div>");
            container.prependTo(document.body);
        } else {
            self.ko.cleanNode(container.get()[0]);
            container.empty();
        }

        return container;
    }

    private getDialogHtml(): string {
        const self = this;
        let content = $(self.$("#ModalPartial").html());

        return content.html();
    }

    public build<T>(options: DialogOptions<T>): JQuery {
        const self = this;

        let myModal = self.$(self.getDialogHtml().replace(/data-copy/gi, "data-bind"));
        self.getContainer().append(myModal);

        let domObj = myModal.get()[0];
        self.ko.applyBindings(options, domObj);

        myModal.on("hidden.bs.modal", (e: JQueryEventObject) => {
            if (options.onHidden) {
                options.onHidden(options, e);
            }
        });

        myModal.modal({
            show: false
        });

        options.dialog = myModal;

        return myModal;
    }
}
