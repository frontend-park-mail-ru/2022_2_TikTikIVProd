import Menu from "../../components/Menu/Menu.js";
import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import config from "../../configs/config.js";
import router from "../../Router/Router.js";

export default class MenuController {
    private view: Menu;
    constructor(view: Menu) {
        this.view = view;
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }

    private clickHandler(event: Event): void {
        event.preventDefault();

        const target = <HTMLElement>event.target;
        if (target !== null) {
            if (target.id === config.menu.feed.id) {
                this.view.changeActiveLink(0);
                router.renderFeed('Pavel');
                return;
            }
            if (target.id === config.menu.profile.id) {
                this.view.changeActiveLink(1);
                router.renderProfile('Pavel');
                return;
            }
            if (target.id === config.menu.logout.id) {
                router.renderSignIn();
                router.renderFooter();
                return;
            }

            const footerItem = signupFormConfig.footer.find((item) => item.id === target.id);
            if (footerItem !== undefined) {
                console.log(`Found link ${target.id}`);

                // TODO Вынести в функцию 
                // Обработать нажания
                // Вызвать роутер на footerItem.href
                router.goToPath(footerItem.href || '');
                return;
            }
            console.log(`Not handeled ${target.id}`);
        }
    }
}