import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import router from "../../Router/Router.js";
import IController from "../IController/IController.js";
export default class SignupFormController extends IController {
    constructor(view, model) {
        super(view, model);
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }
    clickHandler(event) {
        //TODO нужен ли prevent default? 
        console.log(this.model);
        const target = event.target;
        if (target !== null) {
            if (signupFormConfig.submit.id === target.id) {
                console.log('Submitting signup form');
                // TODO вынести в функицию
                // Get data from view
                // Validate 
                // Go to model
                // show errors to view or redirect 
                this.model.authUser();
                if (false) {
                    // Если успешно перейти в фид через роутер
                }
                else {
                    // Если неуспешно показать ошибки
                }
                return;
            }
            const footerItem = signupFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                console.log(`Found link ${target.id}`);
                // TODO Вынести в функцию 
                // Обработать нажания
                // Вызвать роутер на footerItem.href
                router.goToPath(footerItem.href || '', false);
                return;
            }
            console.log(`Not handeled ${target.id}`);
        }
    }
}
