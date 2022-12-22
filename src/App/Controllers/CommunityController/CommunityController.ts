import CommunityModel, { ICommunityEditData } from "../../Models/CommunityModel/CommunityModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
import CommunityView, { ICommunityNavbaParams } from "../../Views/CommunityView/CommunityView";
import IController from "../IController/IController";

/**
 * Котроллер для сообществ
 * @category Community
 * @extends {IController}
 * @param  {CommunityView} view Объект вида компонента сообщества
 */
class CommunityController extends IController<CommunityView, { community: CommunityModel, user: UserModel }> {
    constructor(view: CommunityView, models: { community: CommunityModel, user: UserModel }) {
        super(view, models);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindClick(this.onClick.bind(this));
    }

    public mountComponent(communityId?: string | number): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
        }

        if (communityId) {
            const currentUser = this.model.user.getCurrentUser();

            this.model.community.get(communityId)
                .then(communityData => {
                    let navbarParams: ICommunityNavbaParams = {
                        isAdmin: false,
                        isMember: false,
                    };

                    if (currentUser) {
                        navbarParams.isAdmin = communityData.owner_id === currentUser.id ? true : false;
                    }
                    this.view.setCommunityData(communityData);
                    this.view.setCommunityNavbar(navbarParams);
                })
                .catch(msg => {
                    console.log(msg);
                });
        }
    }

    /**
         * Функция проверки данных, введённых в форму.
         * (приватное поле класса)
         * @param  {Map<string, string>} data - Данные, полученные из формы
         * @return {boolean}
         */
    private validateData(data: Map<string, string>): boolean {
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

    private onClick(e: Event) {
        e.preventDefault();
        const target = <HTMLElement>e.target;
        const communityId = (<HTMLElement>target.closest('.community')?.querySelector('[data-community_id]'))?.dataset['community_id'];
        const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];

        if (target.classList.contains('community__overlay')) {
            this.view.hideOverlay();
            return;
        }

        switch (action) {
            default: return;
            case 'join': {
                if (!communityId) return;
                // TODO
                return;
            }
            case 'left': {
                if (!communityId) return;
                //TODO
                return;
            }
            case 'settings': {
                if (!communityId) return;
                const data = this.model.community.get(communityId)
                    .then(communityData => {
                        this.view.showOverlaySettings(communityData);
                    })
                    .catch(msg => {
                        console.log(msg);
                    });
                return;
            }

            case 'submit': {
                const data = this.view.getDataFromGroup(target);
                const isValidData = this.validateData(data);

                if (!isValidData) {
                    console.log('comm Settings: invalid data');
                    return;
                }

                let params: ICommunityEditData = Object.assign({ id: Number(communityId) }, Object.fromEntries(data));
                this.model.community.edit(params)
                    .then(communityData => {
                        this.view.setCommunityData(communityData);
                        this.view.hideOverlay();
                    })
                    .catch(msg => {
                        console.log(msg, ' fail');
                    });
            }
        }
    }
}

export default CommunityController;