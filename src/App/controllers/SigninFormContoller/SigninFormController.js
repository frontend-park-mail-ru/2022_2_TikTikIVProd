import signinFormConfig from "../../components/SigninFormView/SigninFormViewConfig.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";
import signinFormViewConfig from "../../components/SigninFormView/SigninFormViewConfig.js";
import { validateInput } from "../../utils/Validators/InputValidator.js";
export default class SigninFormController extends IController {
    constructor(view, model) {
        super(view, model);
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }
    clickHandler(event) {
        const target = event.target;
        if (target !== null) {
            if (signinFormConfig.submit.id === target.id) {
                this.submitSigninForm();
                return;
            }
            const footerItem = signinFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                router.goToPath(footerItem.href || '');
                return;
            }
        }
    }
    submitSigninForm() {
        const data = new Map();
        let isCorrectForm = true;
        // Get data from view
        signinFormViewConfig.fields.forEach((item) => {
            const elem = (this.view.getParent().querySelector('#' + item.id));
            if (elem === null) {
                isCorrectForm = false;
                return;
            }
            // Validate 
            if (validateInput(elem.type, elem.value)) {
                elem.classList.remove('form__input__error');
                data.set(elem.getAttribute('model_field'), elem.value);
            }
            else {
                isCorrectForm = false;
                elem.classList.add('form__input__error');
            }
        });
        if (!isCorrectForm) {
            return;
        }
        const user = {
            email: data.get('email'),
            password: data.get('password'),
        };
        // Go to model
        // show errors to view or redirect 
        this.model.authUser(user).then(({ status, body }) => {
            router.goToPath(paths.menu);
            router.goToPath(paths.feedPage);
        }).catch(({ status, body }) => {
            // ПОКРАСИТЬ ПОЛЯ В КРАСНЫЙ
        });
    }
}
