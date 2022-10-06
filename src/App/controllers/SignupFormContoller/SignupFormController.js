import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import { validateInput } from "../../utils/Validators/InputValidator.js";
import IController from "../IController/IController.js";
export default class SignupFormController extends IController {
    constructor(view, model) {
        super(view, model);
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }
    clickHandler(event) {
        //TODO нужен ли prevent default? 
        // TODO fix
        const target = event.target;
        //
        if (target !== null) {
            if (signupFormConfig.submit.id === target.id) {
                this.submitSignupForm();
            }
            const footerItem = signupFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                router.goToPath(footerItem.href || '');
                return;
            }
        }
    }
    submitSignupForm() {
        const data = new Map();
        let isCorrectForm = true;
        // Get data from view
        signupFormConfig.fields.forEach((item) => {
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
            first_name: data.get('first_name'),
            last_name: data.get('last_name'),
            nick_name: data.get('nick_name'),
            email: data.get('email'),
            password: data.get('password'),
        };
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
}
