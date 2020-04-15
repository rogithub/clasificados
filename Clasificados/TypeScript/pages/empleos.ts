import { View as LnkLugarView, Model as LnkLugarModel } from '../components/lnkLugar';
import { View as ListaView, Model as ListaModel } from '../components/lstAnuncios';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';
import { Redirect } from '../services/redirect';
import { Empleo } from '../models/empleo';
import urls from '../constants/serverInfo';

import { View as PaginationView } from '../components/pagination';
import { View as SearchFieldView } from '../components/searchField';

$(() => {
    let api = new JsonReq(serverInfo.host, window);
    let url = new Redirect(window);
    let component = new Component(ko);

    component.register("pagination", PaginationView, (params) => {
        return params.model;
    });
    component.register("search-field", SearchFieldView, (params) => {
        return params.model;
    });

    component.register("lnk-lugar", LnkLugarView, (params) => {
        return new LnkLugarModel(ko, $, api, url);
    });

    component.register("lst-empleos", ListaView, (p) => {
        return new ListaModel<Empleo>(ko, api, urls.api.empleos.search, p.ciudadId, "default-row-template");
    });

    ko.applyBindings();
});