import UserModel from "../../Models/UserModel/UserModel.js";
import router from "../../Router/Router.js";
import HeaderView from "../../Views/HeaderView/HeaderView.js";
import IController from "../IController/IController.js";

export default class HeaderController extends IController<HeaderView, UserModel> {
    constructor(view: HeaderView, model: UserModel) {
        super(view, model);
    }

    // Interface
    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.bindClickEvent(this.handleRedirect.bind(this));
            this.view.show();
            this.isMounted = true;
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.unbindClickEvent(this.handleRedirect.bind(this));
            this.view.hide();
            this.isMounted = false;
        }
    }

    // Specific
    private handleRedirect(e: Event): void {
        e.preventDefault();
        const targetHref = (<HTMLLinkElement>e.target).getAttribute('href');
        console.log(targetHref);
        if (targetHref !== null) {
            router.goToPath(targetHref);
        }
    }
}