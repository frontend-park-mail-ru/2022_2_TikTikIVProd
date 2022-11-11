import router from "../../Router/Router";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
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
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('redirect', this.handleRedirect.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }
    
    /**
     * Функция обработки события перехода на страницу.
     * Изменяет текущий активный элемент меню.
     * (приватное поле класса)
     * @param  {string} href
     * @return {void}
     */
    private handleRedirect(href: string): void {
        this.view.changeActiveMenuItem(href);
    }
    
    /**
     * Функция обработчик события клика на меню
     * (приватное поле класса)
     * @param  {Event} e Параметры события
     * @returns {void}
     */
    private handleClick(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const href = (<HTMLAnchorElement>e.target).closest('.menu-left-item')?.getAttribute('href');
            if (!href) {
                return;
            }
            router.goToPath(href);
        }
    }
}

export default MenuController;