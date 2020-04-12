import { View as LnkLugarView, Model as LnkLugarModel } from '../components/lnkLugar';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';

$(() => {

    let api = new JsonReq(serverInfo.host, window);

    let component = new Component(ko);

    component.register("lnk-lugar", LnkLugarView, (params) => {
        return new LnkLugarModel(ko, $, api);
    });

    ko.applyBindings();
});