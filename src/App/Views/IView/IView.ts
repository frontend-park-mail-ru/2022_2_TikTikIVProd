/**
 * Базовый класс для отображения компонента приложения
 * @class
 * @param  {HTMLElement} parent Родительский элемент для отображения
 */
class IView {
    /**
     * Родительский элемент для данного вида
     * @member
     * @protected
     * @type {HTMLElement}
     */
    protected parent: HTMLElement;

    /**
     * Корневой элемент для данного вида
     * @member
     * @protected
     * @type {HTMLElement}
     */
    protected element: HTMLElement;

    constructor(_parent: HTMLElement, template: string, elemTopQuery: string) {
        this.parent = _parent;
        const parser = new DOMParser();

        const element: HTMLElement | null = parser.parseFromString(template, 'text/html').querySelector(elemTopQuery);
        if (!element) {
            throw Error('cant crate element from template');
        }
        this.element = element;
    }
    
    /**
     * Функция для отрисовки вида
     * @method
     * @param  {any} opts Необязательные аргументы, необходимые при отрисовке
     * @returns {void}
     */
    public show(opts?: any): void{
        this.parent.appendChild(this.element);
    }

    /**
     * Функция для скрытия вида
     * @method
     * @param  {any} opts Необязательные аргументы, необходимые при отрисовке
     * @returns {void}
     */
    public hide(opts?: any): void{
        this.parent.removeChild(this.element);
    }
}

export default IView;