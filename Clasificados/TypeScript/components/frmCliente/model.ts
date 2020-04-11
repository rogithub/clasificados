import { ObsExtension, ObsFrm } from 'valiko';
import { Cliente } from '../../models/cliente';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { GuidService } from '../../services/guid';
import { Url } from '../../shared/url';
import { RequiredString } from '../../validators/requiredString';

export class Model extends ObsFrm {
    public contacto: ObsExtension<string>;
    public empresa: ObsExtension<string>;
    public telefono: ObsExtension<string>;
    public email: ObsExtension<string>;
    public domicilio: ObsExtension<string>;
    public facturacionGuid: KnockoutObservable<string>;
    public fechaCreado: KnockoutObservable<Date>;
    public guid: KnockoutObservable<string>;
    public id: KnockoutObservable<number>;
    public activo: KnockoutObservable<boolean>;
    private api: Api;
    private url: Url;
    public isNew: KnockoutComputed<boolean>;

    constructor(ko: KnockoutStatic, api: Api, url: Url) {
        super(ko);
        this.url = url;
        this.api = api;
        this.contacto = this.add<string>().with(new RequiredString());
        this.empresa = this.add<string>().with(new RequiredString());
        this.telefono = this.add<string>().with(new RequiredString());
        this.email = this.add<string>();
        this.domicilio = this.add<string>();
        this.activo = ko.observable<boolean>(true);
        this.facturacionGuid = ko.observable<string>('');
        this.fechaCreado = ko.observable<Date>(new Date(Date.now()));
        this.guid = ko.observable<string>('');
        this.id = ko.observable<number>(0);
        const self = this;
        this.isNew = ko.pureComputed(() => {
            return self.id() === 0;
        }, self);
    }

    public load(m: Cliente): void {
        const self = this;
        self.contacto.value(m.contacto);
        self.empresa.value(m.empresa);
        self.telefono.value(m.telefono);
        self.email.value(m.email);
        self.domicilio.value(m.domicilio);
        self.activo(m.activo);
        self.facturacionGuid(m.facturacionGuid);
        self.fechaCreado(m.fechaCreado);
        self.guid(m.guid);
        self.id(m.id);
    }

    public retrieve(): Cliente {
        const self = this;
        return {
            contacto: self.contacto.value(),
            empresa: self.empresa.value(),
            telefono: self.telefono.value(),
            email: self.email.value(),
            domicilio: self.domicilio.value(),
            activo: self.activo(),
            facturacionGuid: GuidService.toNullable(self.facturacionGuid()),
            fechaCreado: self.fechaCreado(),
            guid: self.guid(),
            id: self.id()
        }
    }

    public async onSave(): Promise<void> {
        const self = this;
        let isValid = await self.validate();
        if (isValid === false) return;

        let url = urls.api.clientes.base;
        let model = self.retrieve();

        let method = self.isNew() ?
            self.api.post :
            self.api.put;

        await method<void>(url, model);
        self.indexRedirect();
    }

    public indexRedirect = () => {
        const self = this;
        self.url.navigate(urls.web.clientes.index);
    }

    public async init(guid: string): Promise<void> {
        const self = this;
        let url = `${urls.api.clientes.get}/${guid}`;
        let cte = await self.api.get<Cliente>(url);
        self.load(cte);
    }
}