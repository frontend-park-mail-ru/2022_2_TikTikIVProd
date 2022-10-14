import UserModel from "../../Models/UserModel/UserModel.js";
import router from "../../Router/Router.js";
import HeaderView from "../../Views/HeaderView/HeaderView.js";
import IController from "../IController/IController.js";

export default class HeaderController extends IController<HeaderView, UserModel> {
    constructor(view: HeaderView, model: UserModel) {
        super(view, model);
        this.view.bindClickEvent(this.handleRedirect.bind(this));
    }

    private handleRedirect(href: string): void {
        router.goToPath(href);
    }
}