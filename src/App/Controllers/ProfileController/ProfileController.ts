import UserModel, { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import ProfileView from "../../Views/ProfileView/ProfileView";
import IController from "../IController/IController";

/**
 * Котроллер для профиля
 * @category Profile
 * @extends {IController}
 * @param  {ProfileView} view Объект вида профиля пользователя
 */
class ProfileController extends IController<ProfileView, UserModel>{

    // private
    constructor(view: ProfileView, model: UserModel) {
        super(view, model);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }

    // public changeUser(data: any): void {

    // }

    /**
     * Функция установки компонента.
     * @override
     * @return {void}
     */
    public async mountComponent(data?: any) {
        if (!this.isMounted) {
            let userData: IUser | null = null;

            if (data && data.length > 0) {
                await this.model.getUser(data[0])
                    .then((user: IUser) => {
                        // console.log('model: ', user);
                        
                        userData = user;
                    })
                    .catch(({ status, body }) => {
                        // console.log(status, body);
                    });
            } else {
                userData = this.model.getCurrentUser();
            }

            console.log(userData);
            
            if (!userData) {
                console.log('emty user');
                return Promise.reject();
            }

            // TODO
            this.view.show({ avatar: '../src/img/test_avatar.jpg', name: userData.first_name + ' ' + userData.last_name });
            this.isMounted = true;
            return Promise.resolve();
        }

        return Promise.resolve();
    }

    /**
     * Функция обработки события клика на компонент.
     * (приватный метод класса)
     * @param  {Event} e - Объект события
     * @return {void}
     */
    private handleClick(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const targetHref = (<HTMLElement>e.target).getAttribute('href');
            console.log('profile click on: ', targetHref);

            if (!targetHref) {
                return;
            }
            router.goToPath(targetHref);
        }
    }
}

export default ProfileController;