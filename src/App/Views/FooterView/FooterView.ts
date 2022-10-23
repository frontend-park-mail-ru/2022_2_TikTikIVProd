import IView from "../IView/IView";
import footerViewConfig from "./FooterViewConfig";
import footerTemplate from "./FooterView.hbs"

/**
 * Отображение для футера приложения
 * @memberof module:Views
 * @class
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для футера
 */
class FooterView extends IView {
    /**
     * Элемент футера
     * (приватное поле класса)
     */
    private footer: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        const parser = new DOMParser();
        const footer: HTMLElement | null = parser.parseFromString(footerTemplate(footerViewConfig), 'text/html').querySelector('.footer__container');
        if (footer === null) {
            throw Error();
        }
        this.footer = footer;
    }

    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public show(opts?: any): void {
        this.parent.appendChild(this.footer);
    }

    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public hide(opts?: any): void {
        this.parent.removeChild(this.footer);
    }
}

export default FooterView; 