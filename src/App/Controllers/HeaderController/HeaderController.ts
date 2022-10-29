import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import HeaderView from "../../Views/HeaderView/HeaderView";
import headerItems from "../../Views/HeaderView/HeaderViewConfig";
import IController from "../IController/IController";

/**
 * Котроллер для хэдера
 * @category Header
 * @extends {IController}
     * @param  {HeaderView} view Объект вида компонента хэдер
     * @param  {UserModel} model Объект модели пользователя
 */
class HeaderController extends IController<HeaderView, UserModel> {
    constructor(view: HeaderView, model: UserModel) {
        super(view, model);
        this.view.bindClickEvent(this.handleRedirect.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('user-authorized', () => this.view.changeHeaderItem('profile', this.model.getCurrentUser()));
    }

    /**
     * Функция обработки нажатия на хэдер
     * (приватное поле класса)
     * @param  {Event} e
     * @returns {void}
     */
    private handleRedirect(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const href = (<HTMLElement>e.target).closest('[href]')?.getAttribute('href');
            if (href !== undefined && href !== null) {
                router.goToPath(href);
            }
        }
    }
}

export default HeaderController;