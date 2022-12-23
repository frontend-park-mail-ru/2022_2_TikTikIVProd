import CommunityModel, { ICommunityData, ICommunityEditData } from "../../Models/CommunityModel/CommunityModel";
import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
import CommunityView, { ICommunityNavbaParams } from "../../Views/CommunityView/CommunityView";
import CommunityAvatarUploadController from "../CommunityAvatarUploadController/CommunityAvatarUploadController";
import IController from "../IController/IController";

/**
 * Котроллер для сообществ
 * @category Community
 * @extends {IController}
 * @param  {CommunityView} view Объект вида компонента сообщества
 */
class CommunityController extends IController<CommunityView, { community: CommunityModel, user: UserModel }> {
    private avatarUploadController : CommunityAvatarUploadController;
    private commId : number;
    constructor(view: CommunityView, models: { community: CommunityModel, user: UserModel }) {
        super(view, models);
        this.commId = 0;
        this.avatarUploadController = new CommunityAvatarUploadController(this.model.community);

        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('community_avatar_changed', this.redrawCommunityData.bind(this));
        EventDispatcher.subscribe('community_avatar_changed', this.view.hideOverlay.bind(this));

        this.view.bindClick(this.onClick.bind(this));
    }

    private redrawCommunityData() : void {
        this.model.community.get(this.commId)
        .then((communityData : ICommunityData) => {
            const currentUser = this.model.user.getCurrentUser();

            let navbarParams: ICommunityNavbaParams = {
                isAdmin: false,
                isMember: false,
            };

            if (currentUser) {
                navbarParams.isAdmin = communityData.owner_id === currentUser.id ? true : false;
            }

            navbarParams.isMember = communityData.is_subscriber;
            this.view.setCommunityData(communityData);
            this.view.setCommunityNavbar(navbarParams);
        })
        .catch(msg => {
            console.log(msg);
        });
    }

    public mountComponent(communityId?: string | number): void {
        if (!this.isMounted) {
            this.view.show();
            this.isMounted = true;
        }

        if (communityId) {
            this.commId = Number(communityId);
            this.avatarUploadController.setCommunityId(communityId);
            this.redrawCommunityData();
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
        const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];

        if (target.classList.contains('community__overlay')) {
            this.view.hideOverlay();
            return;
        }

        switch (action) {
            default: return;
            case 'join': {
                this.model.community.joinCommutity(this.commId)
                    .then(() => {
                        this.redrawCommunityData();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                return;
            }
            case 'left': {

                this.model.community.leaveCommutity(this.commId)
                    .then(() => {
                        this.redrawCommunityData();
                    })
                    .catch(err => {
                        console.log(err);
                    });
                return;
            }
            case 'settings': {
                const data = this.model.community.get(this.commId)
                    .then(communityData => {
                        this.view.showOverlaySettings(communityData, this.avatarUploadController.getElement());
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

                let params: ICommunityEditData = Object.assign({ id: Number(this.commId) }, Object.fromEntries(data));
                this.model.community.edit(params)
                    .then(communityData => {
                        this.view.hideOverlay();
                        this.redrawCommunityData();
                    })
                    .catch(msg => {
                        console.log(msg, ' fail');
                    });
            }
        }
    }
}

export default CommunityController;