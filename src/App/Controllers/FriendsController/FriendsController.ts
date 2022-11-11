import config from "../../Configs/Config";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
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
            const userId = (<HTMLElement>target.closest('.friend'))?.id;

            if (!userId) {
                // // console.log('No user id in ', target);
                return;
            }

            switch (action) {
                default: return;
                case 'profile': {
                    let url = `${config.api.userProfile.url}`;
                    url = url.replace('{:id}', userId.toString());
                    router.goToPath(url);
                    return;
                }

                case 'add_friend': {
                    // // console.log('add');
                    this.model.addFriend(userId)
                        .then(() => {
                            this.updateFriendsList();
                        })
                        .catch((data) =>  console.log(data));
                    return;
                }

                case 'remove_friend': {
                    // // console.log('remove');
                    this.model.removeFriend(userId)
                        .then(() => {
                            this.updateFriendsList();
                        })
                        .catch((data) =>  console.log(data));
                    return;
                }

                case 'message': {
                    // // console.log('message');
                    let url = Object.assign({}, {url: paths.chat}).url;
                    url = url.replace('{:id}', userId);
                    router.goToPath(url);
                    return;
                }
            }
        }
    }

    public updateFriendsList() {
        const userId = this.model.getCurrentUser()?.id;

        if (!userId) {
            // console.log('Friends err: user id null');
            return;
        }

        this.model.getFriends(userId)
            .then(({ users }) => {
                // console.log(users);
                this.view.clearList(); //TODO
                this.view.fillList(users);
            })
            .catch((resp) => {
                // console.log('Friends err: ', resp);
            });
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
            this.updateFriendsList();
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.isMounted = false;
        }
    }


}

export default FriendsController; 