import router from "../../Router/Router.js";
import IController from "../IController/IController.js";
export default class HeaderController extends IController {
    constructor(view, model) {
        super(view, model);
        this.view.bindClickEvent(this.handleRedirect.bind(this));
    }
    // Specific
    handleRedirect(e) {
        e.preventDefault();
        if (this.isMounted) {
            const targetHref = e.target.getAttribute('href');
            console.log(targetHref);
            if (targetHref !== null) {
                router.goToPath(targetHref);
            }
        }
    }
}
