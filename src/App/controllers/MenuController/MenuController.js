import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import router from "../../Router/Router.js";
import paths from "../../Router/RouterPaths.js";
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
