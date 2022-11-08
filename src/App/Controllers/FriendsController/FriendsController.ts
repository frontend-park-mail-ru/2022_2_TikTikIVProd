import config from "../../Configs/Config";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import FriendsView from "../../Views/FriendsView/FriendsView";
import IController from "../IController/IController";

class FriendsController extends IController<FriendsView, UserModel> {
    constructor(view: FriendsView, model: UserModel) {
        super(view, model);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const target = <HTMLElement>e.target;
            const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
            const userId = (<HTMLElement>target.closest('.friend')).id;

            switch (action) {
                default: return;
                case 'profile': {
                    if (!userId) {
                        console.log('No user id in ', target);
                        return;
                    }

                    let url = `${config.api.userProfile.url}`;
                    url = url.replace('{:id}', userId.toString());
                    router.goToPath(url);
                    return;
                }

                case 'add_friend': {
                    console.log('add');
                    return;
                }

                case 'remove_friend': {
                    console.log('remove');
                    return;
                }

                case 'message': {
                    console.log('message');
                    return;
                }
            }
        }
    }
}

export default FriendsController; 