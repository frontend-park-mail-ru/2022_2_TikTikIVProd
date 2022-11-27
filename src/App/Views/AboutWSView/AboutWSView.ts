import aboutWSTemplate from "./AboutWSView.hbs"
import "./AboutWSView.scss"

import IView from "../IView/IView";

/**
 * Отображение для левого меню приложения
 * @category Menu
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для меню
 */
class AboutWSView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, aboutWSTemplate({}), '.about-ws');
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

export default AboutWSView;