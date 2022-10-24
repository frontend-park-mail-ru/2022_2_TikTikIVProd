import router from "../../Router/Router";
import MenuView from "../../Views/MenuView/MenuView";
import IController from "../IController/IController";

/**
 * Котроллер для левого меню
 * @category Menu
 * @extends {IController}
     * @param  {MenuView} view Объект вида компонента меню
 */
class MenuController extends IController<MenuView, null> {
    constructor(view: MenuView) {
        super(view, null);
        this.view.bindRedirect(this.handleRedirect.bind(this));
    }

    /**
     * Функция обработчик события клика на меню
     * (приватное поле класса)
     * @param  {Event} e Параметры события
     * @returns {void}
     */
    private handleRedirect(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const href = (<HTMLAnchorElement>e.target).getAttribute('href') || '';
            this.view.changeActiveMenuItem(href);
            router.goToPath(href);
        }
    }
}

export default MenuController;