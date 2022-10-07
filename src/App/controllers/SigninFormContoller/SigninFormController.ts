import SigninFormView from "../../components/SigninFormView/SigninFormView.js";
import UserModel from "../../models/UserModel/UserModel.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";
import { IUserSignIn } from "../../models/UserModel/UserModel.js"

export default class SigninFormController extends IController<SigninFormView, UserModel> {
    constructor(view: SigninFormView, model: UserModel) {
        super(view, model);
        this.view.bindSubmitForm(this.submitSigninForm.bind(this));
        this.view.bindRedirect(this.redirect.bind(this));
    }

    submitSigninForm(data: Map<string, string>): void {
        // Go to model
        const user: IUserSignIn = {
            email: data.get('email') || '',
            password: data.get('password') || '',
        }

        // show errors to view or redirect 
        this.model.authUser(user).then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            // ПОКРАСИТЬ ПОЛЯ В КРАСНЫЙ
            switch (status) {
                case 401: {
                    this.view.showErrorInvalidPassword();
                    break;
                }
                case 404: {
                    this.view.showErrorNoSuchUser();
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }

    redirect(path: string): void {
        router.goToPath(path);
    }
}