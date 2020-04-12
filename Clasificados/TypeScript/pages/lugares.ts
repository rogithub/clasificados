import { View as FrmLugar, Model as FormLugarModel } from '../components/frmLugar';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';
import { Redirect } from '../services/redirect';

$(() => {

    let url = new Redirect(window);
    let api = new JsonReq(serverInfo.host, window);

    let component = new Component(ko);

    component.register("frm-lugar", FrmLugar, (params) => {
        return new FormLugarModel(ko, api, url);
    });

    ko.applyBindings();
});