import headerTemplate from "./HeaderView.hbs"
import "./HeaderView.css"

import IView from "../IView/IView";
import headerItems from "./HeaderViewConfig";

/**
 * Отображение для хэдера приложения
 * @category Header
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для хэдера
 */
 class HeaderView extends IView {
    /**
     * Элемент хэдера
     * (приватное поле класса)
     */
    private header: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);

        const parser = new DOMParser();
        const header: HTMLElement | null = parser.parseFromString(headerTemplate({}), 'text/html').querySelector('.header__container');
        if (header === null) {
            throw Error();
        }
        this.header = header;
    }

    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public show(opts?: any): void {
        this.parent.appendChild(this.header);
    }

    /**
     * Реализация метода скрытия вида
     * @returns {void}
     */
    public hide(opts?: any): void {
        this.parent.removeChild(this.header);
    }

  
    /**
     * Функция добавления обработчика события нажатия на компонент
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindClickEvent(listener: any): void {
        this.header.addEventListener('click', listener.bind(this));
    }
    
    /**
     * Функция изменения элемента в хэдере
     * @param  {string} itemName - название элемента
     * @param  {any} data - Данные, необходимые для отрисочки элемента
     * @returns {void}
     */
    public changeHeaderItem(itemName: string, data?: any): void {
        const headerItem = this.header.querySelector('#header__item');
        if (headerItem === null) {
            console.log('Header: no header item');
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