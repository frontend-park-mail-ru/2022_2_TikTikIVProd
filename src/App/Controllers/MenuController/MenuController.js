import router from "../../Router/Router.js";
import IController from "../IController/IController.js";
export default class MenuController extends IController {
    constructor(view) {
        super(view, null);
    }
    mountComponent() {
        if (!this.isMounted) {
            this.view.bindRedirect(this.handleRedirect.bind(this));
            this.view.show();
            this.isMounted = true;
        }
    }
    unmountComponent() {
        if (this.isMounted) {
            this.view.hide();
            this.view.unbindRedirect(this.handleRedirect.bind(this));
            this.isMounted = false;
        }
    }
    handleRedirect(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href') || '';
        this.view.changeActiveMenuItem(href);
        router.goToPath(href);
    }
}
