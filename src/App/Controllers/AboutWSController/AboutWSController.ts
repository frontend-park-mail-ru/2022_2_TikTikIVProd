import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import AboutWSView from "../../Views/AboutWSView/AboutWSView";
import IController from "../IController/IController";

/**
 * Котроллер для профиля
 * @category Profile
 * @extends {IController}
 * @param  {AboutWSView} view Объект вида стрницы описания продукта пользователя
 */
class AboutWSController extends IController<AboutWSView, null>{

    // private
    constructor(view: AboutWSView) {
        super(view, null);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }


    /**
     * Функция обработки события клика на компонент.
     * (приватный метод класса)
     * @param  {Event} e - Объект события
     * @return {void}
     */
    private handleClick(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const target = <HTMLElement>e.target;

            const linkId = target.id;

            if (!linkId) {
                return;
            }

            switch (linkId) {
                default: return;
                case 'about-ws-block-link-signin': {
                    router.goToPath(paths.signinPage);
                    return;
                }
                case 'about-ws-block-link-signup': {
                    router.goToPath(paths.signupPage);
                    return;
                }
            }
        }
    }
}

export default AboutWSController;