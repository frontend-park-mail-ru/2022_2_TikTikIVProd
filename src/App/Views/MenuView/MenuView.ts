import IView from "../IView/IView";
import menuConfig from "./MenuViewConfig"
import menuTemplate from "./MenuView.hbs"

/**
 * Отображение для левого меню приложения
 * @memberof module:Views
 * @class
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для меню
 */
 class MenuView extends IView {
    /**
     * Элемент меню
     * (приватное поле класса)
     */
    private menu: HTMLElement;

    /**
     * Текущий активный пункт меню (URL адрес)
     * (приватное поле класса)
     */
    private currentActiveItem: string | null;

    constructor(parent: HTMLElement) {
        super(parent);

        const parser = new DOMParser();

        const menu: HTMLElement | null = parser.parseFromString(menuTemplate(menuConfig), 'text/html').querySelector('.menu-container');
        if (menu === null) {
            throw Error();
        }
        this.menu = menu;
        this.currentActiveItem = null;
    }

    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public show(opts?: any): void {
        this.parent.appendChild(this.menu);
        // if (opts.currentItem !== undefined) {
        //     this.changeActiveMenuItem(opts.currentItem);
        // }
    }
    
    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public hide(opts?: any): void {
        this.parent.removeChild(this.menu);
    }

    /**
     * Функция изменения активного элемента меню
     * @param  {string} newActiveItem - URL адрес активного элемента меню
     */
    public changeActiveMenuItem(newActiveItem: string) {
        this.menu.querySelector(`[href="${this.currentActiveItem}"]`)?.classList.remove('menu__item--active');
        this.currentActiveItem = newActiveItem;
        this.menu.querySelector(`[href="${newActiveItem}"]`)?.classList.add('menu__item--active');
    }

    /**
     * Функция добавления обработчика события нажатия на меню
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindRedirect(listener: any): void {
        this.menu.addEventListener('click', listener);
    }
}

export default MenuView;