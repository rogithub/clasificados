import { View as LnkLugarView, Model as LnkLugarModel } from '../components/lnkLugar';
import { View as ListView, Model as ListModel } from '../components/lstAnuncios';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';
import { Redirect } from '../services/redirect';
import { Inmueble } from '../models/inmueble';
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

    component.register("lst-inmuebles", ListView, (p) => {
        return new ListModel<Inmueble>(ko, api, urls.api.inmuebles.search, p.ciudadId, "inmueble-row-template");
    });

    ko.applyBindings();
});