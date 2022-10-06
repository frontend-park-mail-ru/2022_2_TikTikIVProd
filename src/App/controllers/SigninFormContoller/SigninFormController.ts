import SigninFormView from "../../components/SigninFormView/SigninFormView.js";
import signinFormConfig from "../../components/SigninFormView/SigninFormViewConfig.js";
import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import UserModel, { IUser } from "../../models/UserModel/UserModel.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";
import signinFormViewConfig from "../../components/SigninFormView/SigninFormViewConfig.js"
import { validateInput } from "../../utils/Validators/InputValidator.js"
import { IAuthData } from "../../models/UserModel/UserModel.js"

export default class SigninFormController extends IController<SigninFormView, UserModel> {
    constructor(view: SigninFormView, model: UserModel) {
        super(view, model);
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }

    private clickHandler(event: Event): void {
        const target = (<HTMLElement>event.target);
        if (target !== null) {
            if (signinFormConfig.submit.id === target.id) {
                this.submitForm();
                return;
            }

            const footerItem = signinFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                console.log(`Found link ${target.id}`);
                router.goToPath(footerItem.href || '');
                return;
            }
            console.log(`Not handeled ${target.id}`);
        }
    }

    private submitForm(): void {
        console.log('Submitting auth form');

        const data = new Map();
        let isCorrectForm = true;

        // Get data from view
        signinFormViewConfig.fields.forEach((item) => {
            const elem = <HTMLInputElement>(this.view.getParent().querySelector('#' + item.id));
            if (elem === null) {
                console.log(`Incorrent form: no filed #${item.id}`);
                isCorrectForm = false;
                return;
            }
            // Validate 
            if (validateInput(elem.type, elem.value)) {
                elem.classList.remove('form__input__error');
                data.set(elem.getAttribute('model_field'), elem.value);
            } else {
                isCorrectForm = false;
                elem.classList.add('form__input__error');
            }
        });

        if (!isCorrectForm) {
            console.log('Signin form invalid');
            return;
        }

        const user: IAuthData = {
            email: data.get('email'),
            password: data.get('password'),
        }
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