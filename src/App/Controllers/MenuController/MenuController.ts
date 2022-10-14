import router from "../../Router/Router.js";
import MenuView from "../../Views/MenuView/MenuView.js";
import IController from "../IController/IController.js";

export default class MenuController extends IController<MenuView, null> {
    constructor(view: MenuView) {
        super(view, null);
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.bindRedirect(this.handleRedirect.bind(this));
            this.view.show();
            this.isMounted = true;
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.view.unbindRedirect(this.handleRedirect.bind(this));
            this.isMounted = false;
        }
    }

    private handleRedirect(e: Event): void {
        e.preventDefault();
        const href = (<HTMLAnchorElement>e.target).getAttribute('href') || '';
        this.view.changeActiveMenuItem(href);
        router.goToPath(href);
    }
}