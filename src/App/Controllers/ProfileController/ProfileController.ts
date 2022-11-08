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


    public async changeProfileUser(userId: number | string) {
        const currentUser = this.model.getCurrentUser();
        if(!currentUser){
            console.log('ProfileContr: current user null');
            return Promise.reject();
        }

        const user = await this.model.getUser(userId);
        if (!user) {
            console.log('ProfileContr: User ', userId, ' does not exist');
            return Promise.reject();
        }
        
        const isFriend = true; // TODO;

        console.log(' T5 ', user.id);

        this.view.redrawProfile(user, currentUser, isFriend);
        
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