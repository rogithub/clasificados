import { ObjectLiteral } from '../../shared/objectLiteral';
import { Lugar } from '../../models/lugar';
import { Api } from '../../shared/api';
import urls from '../../constants/serverInfo';
import { Url } from '../../shared/url';
import { RequiredString } from '../../validators/requiredString';
import { ObsExtension, ObsFrm, Obs } from 'valiko';

export class Model extends ObsFrm {

    public estados: KnockoutObservableArray<ObjectLiteral>;
    public ciudades: KnockoutObservableArray<ObjectLiteral>;
    public ciudad: ObsExtension<string>;
    public estado: ObsExtension<string>;

    private api: Api;
    private url: Url;

    constructor(ko: KnockoutStatic, api: Api, url: Url) {
        super(ko);
        this.url = url;
        this.api = api;
        this.ciudad = this.add<string>().with(new RequiredString());
        this.estado = this.add<string>().with(new RequiredString());
        this.estados = ko.observableArray<ObjectLiteral>([
            { value: "michoacan", text: "Michoacán" }
        ]);

        this.ciudades = ko.observableArray<ObjectLiteral>([
            { value: "uruapan", text: "Uruapan" },
            { value: "ziracuaretiro", text: "Ziracuaretiro" }
        ]);

    }

    public load(m: Lugar): void {
        const self = this;
        self.ciudad.value(m.ciudad);
        self.estado.value(m.estado);
    }

    public retrieve(): Lugar {
        const self = this;
        return {
            ciudad: self.ciudad.value(),
            estado: self.estado.value()
        }
    }

    public async onSave(): Promise<void> {
        const self = this;
        let isValid = await self.validate();
        if (isValid === false) return;

        let url = urls.api.lugares.base;
        let model = self.retrieve();

        await this.api.post<void>(url, model);
        self.indexRedirect();
    }

    public indexRedirect = () => {
        const self = this;
        self.url.navigate(urls.web.home.index);
    }
}