import router from "../../Router/Router.js";
import IController from "../IController/IController.js";
export default class HeaderController extends IController {
    constructor(view, model) {
        super(view, model);
    }
    // Interface
    mountComponent() {
        if (!this.isMounted) {
            this.view.bindClickEvent(this.handleRedirect.bind(this));
            this.view.show();
            this.isMounted = true;
        }
    }
    unmountComponent() {
        if (this.isMounted) {
            this.view.unbindClickEvent(this.handleRedirect.bind(this));
            this.view.hide();
            this.isMounted = false;
        }
    }
    // Specific
    handleRedirect(e) {
        e.preventDefault();
        const targetHref = e.target.getAttribute('href');
        console.log(targetHref);
        if (targetHref !== null) {
            router.goToPath(targetHref);
        }
    }
}
