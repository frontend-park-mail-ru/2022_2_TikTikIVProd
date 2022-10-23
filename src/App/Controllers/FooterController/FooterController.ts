import FooterView from "../../Views/FooterView/FooterView";
import IController from "../IController/IController";

/**
 * Котроллер для футера
 * @memberof module:Controllers
 * @extends {IController}
     * @param  {FooterView} view Объект вида компонента футер
 */
class FooterController extends IController<FooterView, null> {
    constructor(view: FooterView) {
        super(view, null);
    }
}

export default FooterController; 