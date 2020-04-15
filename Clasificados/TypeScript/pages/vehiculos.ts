import { View as LnkLugarView, Model as LnkLugarModel } from '../components/lnkLugar';
import { View as ListView, Model as ListModel } from '../components/lstAnuncios';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';
import { Redirect } from '../services/redirect';
import { Vehiculo } from '../models/vehiculo';
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

    component.register("lst-vehiculos", ListView, (p) => {
        return new ListModel<Vehiculo>(ko, api, urls.api.vehiculos.search, p.ciudadId, "vehiculo-row-template");
    });

    ko.applyBindings();
});