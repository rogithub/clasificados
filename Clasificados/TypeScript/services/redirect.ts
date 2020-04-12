import { Url } from '../shared/url';

export class Redirect implements Url {
    private window: Window;
    constructor(window: Window) {
        this.window = window;
    }

    navigate = (path: string) => {
        const self = this;
        self.window.location.href = path;
    }

    getLocation = (): string => {
        const self = this;
        return self.window.location.href;
    }

    getUrlParameter = (sParam: string): string => {
        const self = this;
        let sPageURL = self.window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? "" : decodeURIComponent(sParameterName[1]);
            }
        }
        return "";
    };
}
