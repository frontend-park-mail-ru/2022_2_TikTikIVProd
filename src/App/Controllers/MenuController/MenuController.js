import router from "../../Router/Router.js";
import IController from "../IController/IController.js";
export default class MenuController extends IController {
    constructor(view) {
        super(view, null);
        this.view.bindRedirect(this.handleRedirect.bind(this));
    }
    handleRedirect(e) {
        e.preventDefault();
        if (this.isMounted) {
            const href = e.target.getAttribute('href') || '';
            this.view.changeActiveMenuItem(href);
            router.goToPath(href);
        }
    }
}
