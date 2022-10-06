import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";
export default class SigninFormController extends IController {
    constructor(view, model) {
        super(view, model);
        this.view.bindSubmitForm(this.submitSigninForm.bind(this));
        this.view.bindRedirect(this.redirect.bind(this));
    }
    submitSigninForm(data) {
        // Go to model
        const user = {
            email: data.get('email') || '',
            password: data.get('password') || '',
        };
        // show errors to view or redirect 
        this.model.authUser(user).then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            // ПОКРАСИТЬ ПОЛЯ В КРАСНЫЙ
        });
    }
    redirect(path) {
        router.goToPath(path);
    }
}
