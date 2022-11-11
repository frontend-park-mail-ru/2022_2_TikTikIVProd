import headerTemplate from "./HeaderView.hbs"
import "./HeaderView.scss"

import IView from "../IView/IView";
import headerItems from "./HeaderViewConfig";

/**
 * Отображение для хэдера приложения
 * @category Header
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для хэдера
 */
 class HeaderView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, headerTemplate({}), '.header-container');
    }

    /**
     * Функция добавления обработчика события нажатия на компонент
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindClickEvent(listener: any): void {
        this.element.addEventListener('click', listener.bind(this));
    }
    
    /**
     * Функция изменения элемента в хэдере
     * @param  {string} itemName - название элемента
     * @param  {any} data - Данные, необходимые для отрисовки элемента
     * @returns {void}
     */
    public changeHeaderItem(itemName: string, data?: any): void {
        const headerItem = this.element.querySelector('#header__item');
        if (headerItem === null) {
            // // console.log('Header: no header item');
            return;
        }

        const elem = headerItems.get(itemName);
        if (elem === undefined) {
            return;
        }

        headerItem.innerHTML = elem.render(Object.assign(elem.data, data));
    }
}

export default HeaderView;