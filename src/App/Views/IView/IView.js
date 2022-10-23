/**
 * Базовый класс для отображения компонента приложения
 * @class
 * @virtual
 * @param  {HTMLElement} parent Родительский элемент для отображения
 */
class IView {
    constructor(_parent) {
        this.parent = _parent;
    }
}
export default IView;
