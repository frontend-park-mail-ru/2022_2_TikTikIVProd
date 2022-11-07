import IView from "../IView/IView"
import pageNotFoundTemplate from  "./PageNotFoundView.hbs"
import "./PageNotFoundView.scss"

/**
 * Отображение для левого меню приложения
 * @category Page404
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для страницы 404
 */
class PageNotFoundView extends IView{
    constructor(parent : HTMLElement) {
        super(parent, pageNotFoundTemplate({}), '.page-not-found');
    }
}

export default PageNotFoundView;