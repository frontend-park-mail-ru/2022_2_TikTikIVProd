import ImageUploadModel from "../../Models/ImageUploadModel/ImageUploadModel";
import UserModel, { IProfileSettings } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
import AvatarUploadView from "../../Views/AvatarUploadView/AvatarUploadView";
import SettingsView from "../../Views/SettingsView/SettingsView";
import AvatarUploadController from "../AvatarUploadController/AvatarUploadController";
import IController from "../IController/IController";

/**
 * Котроллер для компонента настроек профиля пользователя
 * @category Settings
 * @extends {IController}
 * @param  {SettingsView} view Объект вида компонента настроек пользователя
 * @param {UserModel} model Модель пользователя
 */
class SettingsController extends IController<SettingsView, {user: UserModel, images: ImageUploadModel}> {
    // private avatarUploadController : AvatarUploadController;

    constructor(view: SettingsView, models:  {user: UserModel, images: ImageUploadModel}) {
        super(view, models);

        // this.avatarUploadController = new AvatarUploadController(this.view.getAvatarUploadView(), this.model.images);

        this.view.bindClick(this.handleClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }

    private test() {
        // // console.log(this.view.getAvatarUploadView().view.preview);
        // // console.log(this.view.)
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            // this.avatarUploadController.unmountComponent();
            this.view.hide();
            this.isMounted = false;
        }
    }
    /**
     * Функция установки компонента.
     * @override
     * @return {void}
     */
    public mountComponent(): void {
        if (!this.isMounted) {
            const user = this.model.user.getCurrentUser();
            if (!user) {
                // console.log('Settings contr error no user');
                return;
            }

            //
            // this.avatarUploadController.mountComponent();
            //

            this.view.show(user);
            this.isMounted = true;
        }
    }

    /**
     * Функция обработки события клика на компонент.
     * (приватный метод класса)
     * @param  {Event} e - Объект события
     * @return {void}
     */
    private handleClick(e: Event): void {
        // e.preventDefault();
        if (this.isMounted) {
            const target = <HTMLElement>e.target;
            const action = (<HTMLElement>target.closest('[data-action]'))?.dataset['action'];

            if (!action) {
                // console.log('No action ', target);
                return;
            }

            switch (action) {
                default: {
                    // console.log('Settings No action ', action, ' in ', target);
                    // this.avatarUploadController.handleClick(target);
                    return;
                }

                case 'submit': {
                    const data = this.view.getDataFromGroup(target);
                    const isValidData = this.validateData(data);

                    if (!isValidData) {
                        // // console.log('Settings: invalid data');
                        return;
                    }

                    let params: IProfileSettings = Object.fromEntries(data);
                    this.model.user.updateUserData(params)
                        .catch(data => {
                            // console.log(data, ' fail');
                        });
                }
            }
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
            let ref: string | undefined = undefined;
            if (key === 'repeat_password') {
                ref = data.get('password');
            }

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
}

export default SettingsController;