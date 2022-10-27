import UserModel from "../../Models/UserModel/UserModel";
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
    constructor(view: ProfileView, model: UserModel) {
        super(view, model);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            const data = this.model.getCurrentUser();
            if(!data) { 
                console.log("Profile error: current user empty"); 
            return;
            }
            // TODO
            this.view.show({avatar: '../src/img/test_avatar.jpg', name: data.first_name + ' ' + data.last_name});
            this.isMounted = true;
        }
    }

    private handleClick(e : Event) : void{
    e.preventDefault();
    const targetHref = (<HTMLElement>e.target).getAttribute('href');
    console.log('profile click on: ', targetHref);
    
    if(!targetHref){
        return;
    }
    router.goToPath(targetHref);
    }
}

export default ProfileController;