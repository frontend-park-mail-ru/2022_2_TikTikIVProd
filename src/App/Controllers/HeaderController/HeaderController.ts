import UserModel, { IUser } from "../../Models/UserModel/UserModel";
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
class HeaderController extends IController<HeaderView, null> {
    constructor(view: HeaderView) {
        super(view, null);
        this.view.bindClickEvent(this.handleClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('user-changed', (user: IUser) => {
            if (user) {
                // console.log('Header: ', user);

                this.view.changeHeaderItem('profile', user);
            }
        });

        EventDispatcher.subscribe('redirect-signin', () => {
            this.view.changeHeaderItem('signupButton');
        });

        EventDispatcher.subscribe('redirect-signup', () => {
            this.view.changeHeaderItem('signinButton');
        });
    }

    /**
     * Функция обработки нажатия на хэдер
     * (приватное поле класса)
     * @param  {Event} e
     * @returns {void}
     */
    private handleClick(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const href = (<HTMLElement>e.target).closest('[href]')?.getAttribute('href');
            if (href !== undefined && href !== null) {
                router.goToPath(href);
            }
            else if ((<HTMLElement>e.target).dataset.action === "change_theme") {
                const root = document.getElementById('root');
                if (root !== undefined && root != null) {
                    root.classList.toggle('dark-mode')
                }
            }
        }
    }
}

export default HeaderController;