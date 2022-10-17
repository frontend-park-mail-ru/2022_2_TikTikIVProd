import router from "../../Router/Router.js";
import MenuView from "../../Views/MenuView/MenuView.js";
import IController from "../IController/IController.js";

export default class MenuController extends IController<MenuView, null> {
    constructor(view: MenuView) {
        super(view, null);
        this.view.bindRedirect(this.handleRedirect.bind(this));
    }

    private handleRedirect(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const href = (<HTMLAnchorElement>e.target).getAttribute('href') || '';
            this.view.changeActiveMenuItem(href);
            router.goToPath(href);
        }
    }
}