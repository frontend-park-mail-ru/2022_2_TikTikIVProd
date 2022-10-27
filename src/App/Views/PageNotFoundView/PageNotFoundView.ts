import IView from "../IView/IView"
import pageNotFoundTemplate from  "./PageNotFoundView.hbs"
import "./PageNotFoundView.css"

class PageNotFoundView extends IView{
    constructor(parent : HTMLElement) {
        super(parent, pageNotFoundTemplate({}), '.page__not_found');
    }
}

export default PageNotFoundView;