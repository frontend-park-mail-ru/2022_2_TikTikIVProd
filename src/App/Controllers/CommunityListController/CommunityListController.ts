import CommunityModel, { ICommunityCreateData } from "../../Models/CommunityModel/CommunityModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
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

        if (target.classList.contains('communities__overlay')) {
            this.view.hideCommunityCreationForm();
            return;
        }

        switch (action) {
            default: return;

            case 'community': {
                if (!communityId) return;
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

            case 'create_community': {
                this.view.showCommunityCreationForm();
                this.view.unlockForm();
                return;
            }
            case 'submit_form': {
                const data = this.view.getFormData();
                const isValidData = this.validateFormData(data);

                if (!isValidData) {
                    console.log('Settings: invalid data');
                    return;
                }

                const params : ICommunityCreateData = {
                    name: data.get('name') ?? '',
                    description: data.get('description') ?? '',
                    avatar_id: 1, // TODO
                }

                this.view.lockForm();
                this.model.community.create(params)
                .then(data => {
                    this.view.unlockForm();
                    this.view.hideCommunityCreationForm();
                })
                .catch(data => {
                    this.view.unlockForm();
                    console.log('err ', data);
                });

                return;
            }
        }
    }

    private validateFormData(data: Map<string, string>): boolean {
        let isFormValid = true;
        data.forEach((value, key) => {
            let ref = undefined;

            const { isValid, msg } = validateInput(key, value, ref);
            if (!isValid) {
                isFormValid = false;
                this.view.showErrorMsg(key, msg);
                return;
            }
            this.view.hideErrorMsg(key);
        });
        return isFormValid;
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