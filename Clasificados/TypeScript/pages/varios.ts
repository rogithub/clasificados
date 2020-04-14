import { View as LnkLugarView, Model as LnkLugarModel } from '../components/lnkLugar';
import { View as ListVariosView, Model as ListVariosModel } from '../components/lstVarios';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';
import { Redirect } from '../services/redirect';

$(() => {

    let api = new JsonReq(serverInfo.host, window);
    let url = new Redirect(window);
    let component = new Component(ko);

    component.register("lnk-lugar", LnkLugarView, (params) => {
        return new LnkLugarModel(ko, $, api, url);
    });

    component.register("lst-varios", ListVariosView, (params) => {
        let model = new ListVariosModel(ko, $, api);
        model.init(params.ciudadId);
        return model;
    });

    ko.applyBindings();
});