import router from "../../Router/Router.ts";
import MenuView from "../../Views/MenuView/MenuView.ts";
import IController from "../IController/IController.ts";

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