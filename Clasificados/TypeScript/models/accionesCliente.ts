import { Cliente } from './cliente';
import { Model as Dialog, PopupSize } from '../components/dialog';
import { Url } from '../shared/url';
import { Api } from '../shared/api';
import urls from '../constants/serverInfo';

export class AccionesCliente {
    private cliente: Cliente;
    private dialog: Dialog;
    private url: Url;
    private ko: KnockoutStatic;
    private api: Api;
    constructor(ko: KnockoutStatic, api: Api, dialog: Dialog, url: Url, cliente: Cliente) {
        this.ko = ko;
        this.api = api;
        this.cliente = cliente;
        this.dialog = dialog;
        this.url = url;
    }

    public confirm = async (): Promise<void> => {
        const self = this;
        let url = `${urls.api.clientes.base}/${self.cliente.guid}`;
        await self.api.del<void>(url);
        self.url.navigate(urls.web.clientes.index);
    }

    public onDelete = () => {
        const self = this;
        let dlg = self.dialog.build({
            contentTemplate: "delete-cliente-dialog-content",
            footerTemplate: "delete-cliente-dialog-footer",
            model: self,
            title: "Borrar Cliente",
            size: PopupSize.medium
        });

        dlg.modal("show");
    }

    public onEdit = () => {
        const self = this;
        let url = `${urls.web.clientes.editar}/${self.cliente.guid}`;
        self.url.navigate(url);
    }
}