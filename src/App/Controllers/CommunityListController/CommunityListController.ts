import CommunityModel from "../../Models/CommunityModel/CommunityModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import CommunityListView from "../../Views/CommunityListView/CommunityListView";
import IController from "../IController/IController";

/**
 * Котроллер для страницы с сообществами пользователя
 * @category Community
 * @extends {IController}
 * @param  {CommunityListView} view Объект вида компонента сообщества
 */
class CommunityListController extends IController<CommunityListView, { community: CommunityModel, user: UserModel }> {
    constructor(view: CommunityListView, models: { community: CommunityModel, user: UserModel }) {
        super(view, models);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.onClick.bind(this));
    }

    private onClick(e: Event): void {
        e.preventDefault();
        const target = <HTMLElement>e.target;
        const communityId = (<HTMLElement>target.closest('.community-list-item'))?.id;
        const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];
        
        switch (action) {
            default: return;

            case 'community': {
                if(!communityId) return;
                let url = `${paths.community}`;
                url = url.replace('{:id}', communityId.toString());
                router.goToPath(url);
                return;
            }

            case 'join': {
                // TODO
                return;
            }

            case 'left': {
                // TODO
                return;
            }
        }
    }

    public updateList() {
        this.model.community.getAll()
            .then((data) => {
                this.view.clearList(); //TODO
                this.view.fillList(data);
            })
            .catch((resp) => {
                console.log('Friends err: ', resp);
            });
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
            this.updateList();
        }
    }
}

export default CommunityListController;