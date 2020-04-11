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
}
