import Menu from "../../components/Menu/Menu.js";
import signupFormConfig from "../../components/SignupFormView/SignupFormViewConfig.js";
import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";

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
                router.goToPath(paths.feedPage);
                return;
            }
            if (target.id === config.menu.profile.id) {
                this.view.changeActiveLink(1);
                router.goToPath(paths.profile);
                return;
            }
            if (target.id === config.menu.logout.id) {
                ajax.get(`${config.APIUrl}/logout`);
                router.goToPath(paths.signinPage);
                return;
            }
        }
    }
}