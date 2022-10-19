import UserModel from "../../Models/UserModel/UserModel";
import router from "../../Router/Router";
import HeaderView from "../../Views/HeaderView/HeaderView";
import IController from "../IController/IController";

export default class HeaderController extends IController<HeaderView, UserModel> {
    constructor(view: HeaderView, model: UserModel) {
        super(view, model);
        this.view.bindClickEvent(this.handleRedirect.bind(this));
    }

    // Specific
    private handleRedirect(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const href = (<HTMLElement>e.target).closest('[href]')?.getAttribute('href');
            if (href !== undefined && href !== null) {
                router.goToPath(href);
            }
        }
    }
}