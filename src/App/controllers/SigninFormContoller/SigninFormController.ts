import SigninFormView from "../../components/SigninFormView/SigninFormView.js";
import signinFormConfig from "../../components/SigninFormView/SigninFormViewConfig.js";
import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import UserModel from "../../models/UserModel/UserModel.js";
import router from "../../Router/Router.js";
import IController from "../IController/IController.js";

export default class SigninFormController extends IController<SigninFormView, UserModel> {
    constructor(view: SigninFormView, model: UserModel) {
        super(view, model);
        // TODO: Листенер на контент, а не на родителя
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }

    private clickHandler(event: Event): void {
        //TODO нужен ли prevent default? 
        console.log(this.model);

        const target = <HTMLElement>event.target;
        if (target !== null) {
            if (signinFormConfig.submit.id === target.id) {
                console.log('Submitting auth form');
                // TODO вынести в функицию
                // Get data from view
                // Validate 

                // Go to model

                // show errors to view or redirect 
                this.model.authUser();
                if (false) {
                    // Если успешно перейти в фид через роутер

                } else {
                    // Если неуспешно показать ошибки
                }

                return;
            }

            const footerItem = signinFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                console.log(`Found link ${target.id}`);

                // TODO Вынести в функцию 
                // Обработать нажания
                // Вызвать роутер на footerItem.href
                router.goToPath(footerItem.href || '', false);
            }
            console.log(`Not handeled ${target.id}`);
        }
    }
}