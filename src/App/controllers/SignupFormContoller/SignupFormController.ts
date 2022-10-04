import SignupView from "../../components/SignupFormView/SignupFormView.js";
import signupConfig from "../../components/SignupFormView/SignupFormViewConfig";
import UserModel from "../../models/UserModel/UserModel.js";
import IController from "../IController/IController.js";

export default class SignupFormController extends IController<SignupView, UserModel> {
    constructor(view: SignupView, model: UserModel) {
        super(view, model);
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }

    private clickHandler(event: Event): void {
        //TODO нужен ли prevent default? 
        console.log(this.model);

        const target = <HTMLElement>event.target;
        if (target !== null) {
            if (signupConfig.submit.id === target.id) {
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

            const footerItem = signupConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                console.log(`Found link ${target.id}`);

                // TODO Вынести в функцию 
                // Обработать нажания
                // Вызвать роутер на footerItem.href
                return;
            }
            console.log(`Not handeled ${target.id}`);
        }
    }
}