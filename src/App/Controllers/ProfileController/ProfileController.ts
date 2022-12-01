import config from "../../Configs/Config";
import UserModel, { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
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
        if (!currentUser) {
            // console.log('ProfileContr: current user null');
            return Promise.reject();
        }

        const user = await this.model.getUser(userId);
        if (!user) {
            // console.log('ProfileContr: User ', userId, ' does not exist');
            return Promise.reject();
        }

        let isFriend = false;
        if(user.id !== currentUser.id){
            isFriend = await this.model.isFriend(userId); // TODO;
        } 

        // console.log(' T5 ', user.id, isFriend);

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
            const target = <HTMLElement>e.target;

            const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
            const userId = (<HTMLElement>target.closest('.profile')?.querySelector('.profile-user'))?.dataset['user_id'];
            
            if(!userId) {
                // console.log('usr id frield empty');
                return;
            }

            // // console.log('profile click on: ', action);
            
            switch (action) {
                default: return;
                case 'settings': {
                    router.goToPath(paths.settings);
                    return;
                }
                case 'message': {
                    // // console.log('message');

                    let url = Object.assign({}, {url: paths.chat}).url;
                    url = url.replace('{:id}', userId);
                    // console.log(url);
                    router.goToPath(url);
                    return;
                }
                case 'add_to_friends': {
                    if (!userId) {
                        // console.log('add friend err');
                        return;
                    }
                    this.model.addFriend(userId)
                    .then(()=>{
                        // // console.log('succ');
                        this.changeProfileUser(userId);
                    })
                    .catch((data) => {
                        // console.log(data);
                    })
                    return;
                }
                case 'remove_friend': {
                    if (!userId) {
                        // console.log('remove friend err');
                        return;
                    }

                    this.model.removeFriend(userId)
                    .then(()=>{
                        // // console.log('succ');
                        this.changeProfileUser(userId);
                    })
                    .catch((data) => {
                        // console.log(data);
                    })
                    return;
                }
            }
        }
    }
}

export default ProfileController;