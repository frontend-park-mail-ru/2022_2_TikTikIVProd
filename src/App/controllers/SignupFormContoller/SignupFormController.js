import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";
export default class SignupFormController extends IController {
    constructor(view, model) {
        super(view, model);
        this.view.bindSubmitForm(this.submitSignupForm.bind(this));
        this.view.bindRedirect(this.redirect.bind(this));
    }
    submitSignupForm(data) {
        const user = {
            first_name: data.get('first_name') || '',
            last_name: data.get('last_name') || '',
            nick_name: data.get('nick_name') || '',
            email: data.get('email') || '',
            password: data.get('password') || '',
        };
        // Go to model
        // show errors to view or redirect 
        this.model.registerUser(user).then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            // ПОКРАСИТЬ ПОЛЯ В КРАСНЫЙ
            switch (status) {
                case 409: {
                    this.view.showErrorUserExists();
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
    redirect(path) {
        router.goToPath(path);
    }
}
