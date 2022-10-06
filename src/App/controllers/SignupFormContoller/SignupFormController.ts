import SignupView from "../../components/SignupFormView/SignupFormView.js";
import UserModel, { IUserSignUp } from "../../models/UserModel/UserModel.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";

export default class SignupFormController extends IController<SignupView, UserModel> {
    constructor(view: SignupView, model: UserModel) {
        super(view, model);
        this.view.bindSubmitForm(this.submitSignupForm.bind(this));
        this.view.bindRedirect(this.redirect.bind(this));
    }

    submitSignupForm(data: Map<string, string>): void {

        const user: IUserSignUp = {
            first_name: data.get('first_name') || '',
            last_name: data.get('last_name') || '',
            nick_name: data.get('nick_name') || '',
            email: data.get('email') || '',
            password: data.get('password') || '',
        }

        // Go to model
        // show errors to view or redirect 
        this.model.registerUser(user).then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            // ПОКРАСИТЬ ПОЛЯ В КРАСНЫЙ
            console.log('cant register');
        });
    }

    redirect(path: string): void {
        router.goToPath(path);
    }
}