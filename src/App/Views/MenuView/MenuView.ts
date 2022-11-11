import menuTemplate from "./MenuView.hbs"
import "./MenuView.scss"

import IView from "../IView/IView";
import menuConfig from "./MenuViewConfig"

/**
 * Отображение для левого меню приложения
 * @category Menu
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для меню
 */
 class MenuView extends IView {
    /**
     * Текущий активный пункт меню (URL адрес)
     * (приватное поле класса)
     */
    private currentActiveItem: string | null;

    constructor(parent: HTMLElement) {
        super(parent, menuTemplate(menuConfig), '.menu-left');
    }

    /**
     * Функция изменения активного элемента меню
     * @param  {string} href - URL адрес активного элемента меню
     */
    public changeActiveMenuItem(href: string) {
        // // console.log(href);
        this.element.querySelector(`[href="${this.currentActiveItem}"]`)?.classList.remove('menu-left-item--active');
        this.currentActiveItem = href;
        this.element.querySelector(`[href="${href}"]`)?.classList.add('menu-left-item--active');
    }

    /**
     * Функция добавления обработчика события нажатия на меню
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindClick(listener: any): void {
        this.element.addEventListener('click', listener);
    }
}

export default MenuView;