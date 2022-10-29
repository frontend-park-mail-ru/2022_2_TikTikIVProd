import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import PageNotFoundView from "../../Views/PageNotFoundView/PageNotFoundView";
import IController from "../IController/IController";

/**
 * Котроллер для страницы 404
 * @category Page404
 * @extends {IController}
 * @param  {PageNotFoundView} view Объект вида страницы 404
 */
class PageNotFoundController extends IController<PageNotFoundView, null>{
    constructor(view: PageNotFoundView) {
        super(view, null);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }
}

export default PageNotFoundController;