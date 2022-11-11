import footerTemplate from "./FooterView.hbs"
import "./FooterView.scss"

import IView from "../IView/IView";
import footerViewConfig from "./FooterViewConfig";

/**
 * Отображение для футера приложения
 * @category Footer
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для футера
 */
class FooterView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, footerTemplate(footerViewConfig), '.footer__container');   
    }
}

export default FooterView; 