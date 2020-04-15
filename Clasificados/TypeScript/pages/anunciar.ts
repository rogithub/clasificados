import { View as FrmView, Model as FormModel } from '../components/frmAnuncio';
import { Component } from '../services/component';
import serverInfo from '../constants/serverInfo';
import { JsonReq } from '../services/jsonReq';
import { Redirect } from '../services/redirect';

$(() => {

    let url = new Redirect(window);
    let api = new JsonReq(serverInfo.host, window);

    let component = new Component(ko);

    component.register("frm-lugar", FrmView, () => {
        let model = new FormModel(ko, api, url);
        model.load();
        return model;
    });

    ko.applyBindings();
});