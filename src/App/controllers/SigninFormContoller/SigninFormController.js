import signinFormConfig from "../../components/SigninFormView/SigninFormViewConfig.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
import IController from "../IController/IController.js";
export default class SigninFormController extends IController {
    constructor(view, model) {
        super(view, model);
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }
    clickHandler(event) {
        //TODO нужен ли prevent default? 
        // TODO fix
        const target = event.target;
        // const target = <HTMLElement>event.target;
        if (target !== null) {
            if (signinFormConfig.submit.id === target.id) {
                console.log('Submitting auth form');
                // TODO вынести в функицию
                // Get data from view
                // Validate 
                // Go to model
                // show errors to view or redirect 
                // ИЗМЕНИТЬ ХАРДКОД НА ТЕКСТ ИЗ ПОЛЕЙ
                this.model.authUser('dkostev68@gmail.com', '12345').then(({ status, body }) => {
                    router.goToPath(paths.menu);
                    router.goToPath(paths.feedPage);
                }).catch(({ status, body }) => {
                    // ПОКРАСИТЬ ПОЛЯ В КРАСНЫЙ
                });
                return;
            }
            const footerItem = signinFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                console.log(`Found link ${target.id}`);
                // TODO Вынести в функцию 
                // Обработать нажания
                // Вызвать роутер на footerItem.href
                router.goToPath(footerItem.href || '');
            }
            console.log(`Not handeled ${target.id}`);
        }
    }
}
