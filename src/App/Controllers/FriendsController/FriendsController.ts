import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import throttle from "../../Utils/Throttle/Throttle";
import FriendsView from "../../Views/FriendsView/FriendsView";
import IController from "../IController/IController";


class FriendsController extends IController<FriendsView, UserModel> {
    private ignoreSearch: boolean;
    constructor(view: FriendsView, model: UserModel) {
        super(view, model);
        this.ignoreSearch = false;
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.handleClick.bind(this));
        this.view.bindSearchChange(throttle(this.handleSearchChange.bind(this), 1000));
    }

    private handleSearchChange(e: Event): void {
        const searchQuery = this.view.getSearchData();
        this.searchUsers(searchQuery);
    }

    private searchUsers(name: string): void {
        if (name.length < 1) {
            this.updateFriendsList();
            this.ignoreSearch = true;
            return;
        }
        this.ignoreSearch = false;

        this.model.findUsers(name)
            .then(users => {
                if (this.ignoreSearch) return;

                const currentUserId = this.model.getCurrentUser()?.id;
                if (!currentUserId) return;

                this.model.getFriends(currentUserId)
                    .then(friends => {
                        users.forEach(user => {
                            user.isCurrent = user.id === currentUserId ? 1 : 0;
                            user.isFriend = friends.find(friend => friend.id === user.id) ? 1 : 0;
                        });
                        this.view.clearList(); //TODO
                        this.view.fillList(users);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    private handleClick(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const target = <HTMLElement>e.target;

            const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
            const userId = (<HTMLElement>target.closest('.friend'))?.id;



            switch (action) {
                default: return;
                case 'profile': {
                    if (!userId) return;

                    let url = `${paths.userProfie}`;
                    url = url.replace('{:number}', userId.toString());
                    router.goToPath(url);
                    return;
                }

                case 'add_friend': {
                    if (!userId) return;
                    this.model.addFriend(userId)
                        .then(() => {
                            this.updateFriendsList(userId);
                        })
                        .catch((data) => console.log(data));
                    return;
                }

                case 'remove_friend': {
                    if (!userId) return;

                    this.model.removeFriend(userId)
                        .then(() => {
                            this.updateFriendsList(userId);
                        })
                        .catch((data) => console.log(data));
                    return;
                }

                case 'message': {
                    if (!userId) return;
                    let url = Object.assign({}, { url: paths.chat }).url;
                    url = url.replace('{:id}', userId);
                    router.goToPath(url);
                    return;
                }

                case 'submit_search': {
                    const name = this.view.getSearchData();
                    this.searchUsers(name);
                    return;
                }
            }
        }
    }

    public updateFriendsList(userId?: string | number) {

        if (userId) {
            this.model.isFriend(userId)
                .then(res => {
                    this.model.getUser(userId)
                        .then(user => {
                            this.view.changeUserFriendshipStatus(user, res);
                        });
                });
            return;
        }

        const currentUserId = this.model.getCurrentUser()?.id;

        if (!currentUserId) return;

        this.model.getFriends(currentUserId)
            .then(users => {
                users.forEach(user => {
                    user.isFriend = 1;
                    user.isCurrent = 0;
                });
                this.view.clearList(); //TODO
                this.view.fillList(users);
            });
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
            this.updateFriendsList();
            this.view.clearList();
            this.view.clearInput();
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