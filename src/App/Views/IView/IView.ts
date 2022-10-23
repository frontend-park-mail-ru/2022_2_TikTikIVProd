/**
 * @module Views
 */
/**
 * Базовый класс для отображения компонента приложения
 * @class
 * @virtual
 * @param  {HTMLElement} parent Родительский элемент для отображения
 */
abstract class IView {
    /**
     * Родительский элемент для данного вида
     * @member
     * @protected
     * @type {HTMLElement}
     */
    protected parent: HTMLElement;

    constructor(_parent: HTMLElement) {
        this.parent = _parent;
    }
    
    /**
     * Функция для отрисовки вида
     * @method
     * @virtual
     * @param  {any} opts Необязательные аргументы, необходимые при отрисовке
     * @returns {void}
     */
    abstract show(opts?: any): void;

    /**
     * Функция для скрытия вида
     * @method
     * @virtual
     * @param  {any} opts Необязательные аргументы, необходимые при отрисовке
     * @returns {void}
     */
    abstract hide(opts?: any): void;
}

export default IView;