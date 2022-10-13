import router from "../../Router/Router.js";
import MenuView from "../../Views/MenuView/MenuView.js";
import IController from "../IController/IController.js";

export default class MenuController extends IController<MenuView, null> {
    constructor(view: MenuView) {
        super(view, null);
        this.view.bindRedirect(this.onRedirect.bind(this));
    }

    private onRedirect(href: string): void {
        router.goToPath(href);
    }
}