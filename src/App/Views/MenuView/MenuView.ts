import menuTemplate from "./MenuView.hbs"
import "./MenuView.css"

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
        super(parent, menuTemplate(menuConfig), '.menu-container');
    }

    /**
     * Функция изменения активного элемента меню
     * @param  {string} newActiveItem - URL адрес активного элемента меню
     */
    public changeActiveMenuItem(newActiveItem: string) {
        this.element.querySelector(`[href="${this.currentActiveItem}"]`)?.classList.remove('menu__item--active');
        this.currentActiveItem = newActiveItem;
        this.element.querySelector(`[href="${newActiveItem}"]`)?.classList.add('menu__item--active');
    }

    /**
     * Функция добавления обработчика события нажатия на меню
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindRedirect(listener: any): void {
        this.element.addEventListener('click', listener);
    }
}

export default MenuView;