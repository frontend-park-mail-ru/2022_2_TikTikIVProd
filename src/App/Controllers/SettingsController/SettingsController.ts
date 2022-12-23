import UserModel, { IProfileSettings } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
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
class SettingsController extends IController<SettingsView, UserModel> {
    private avatarUploadController : AvatarUploadController;

    constructor(view: SettingsView, model: UserModel) {
        super(view, model);

        this.avatarUploadController = new AvatarUploadController(this.model);

        this.view.bindClick(this.handleClick.bind(this));
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
    }

    /**
     * Функция установки компонента.
     * @override
     * @return {void}
     */
    public mountComponent(): void {
        if (!this.isMounted) {
            const user = this.model.getCurrentUser();
            if (!user) {
                return;
            }
            console.log('mount');
            
            this.view.show({user: user, avatarUploadElement: this.avatarUploadController.getElement()});
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
                    this.model.updateUserData(params)
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