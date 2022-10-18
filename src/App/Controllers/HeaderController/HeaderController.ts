import UserModel from "../../Models/UserModel/UserModel.ts";
import router from "../../Router/Router.ts";
import HeaderView from "../../Views/HeaderView/HeaderView.ts";
import IController from "../IController/IController.ts";

export default class HeaderController extends IController<HeaderView, UserModel> {
    constructor(view: HeaderView, model: UserModel) {
        super(view, model);
        this.view.bindClickEvent(this.handleRedirect.bind(this));
    }

    // Specific
    private handleRedirect(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const targetHref = (<HTMLLinkElement>e.target).getAttribute('href');
            console.log(targetHref);
            if (targetHref !== null) {
                router.goToPath(targetHref);
            }
        }
    }
}