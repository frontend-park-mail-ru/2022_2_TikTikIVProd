import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import config from "../../configs/config.js";
import router from "../../Router/Router.js";
import renderFeed from "../../utils/RenderFeed.js";
import renderProfile from "../../utils/RenderProfile.js";
export default class MenuController {
    constructor(view) {
        this.view = view;
        (this.view.getParent()).addEventListener('click', this.clickHandler.bind(this));
    }
    clickHandler(event) {
        event.preventDefault();
        const target = event.target;
        if (target !== null) {
            if (target.id === config.menu.feed.id) {
                this.view.changeActiveLink(0);
                renderFeed('Pavel');
                return;
            }
            if (target.id === config.menu.profile.id) {
                this.view.changeActiveLink(1);
                renderProfile('Pavel');
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
