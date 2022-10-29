import UserModel from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import validateInput from "../../Utils/Validators/InputValidator/InputValidator";
import SettingsView from "../../Views/SettingsView/SettingsView";
import IController from "../IController/IController";

/**
 * Котроллер для компонента настроек профиля пользователя
 * @category Settings
 * @extends {IController}
 * @param  {SettingsView} view Объект вида компонента настроек пользователя
 * @param {UserModel} model Модель пользователя
 */
class SettingsController extends IController<SettingsView, UserModel> {
    constructor(view: SettingsView, model: UserModel) {
        super(view, model);
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
                console.log('Settings contr error no user');
                return;
            }
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
        e.preventDefault();
        if (this.isMounted) {
            const target = <HTMLElement>e.target;
            if ((<HTMLButtonElement>target).type !== 'submit') {
                return;
            }

            const data = this.view.getDataFromGroup(target);
            const isValidData = this.validateData(data);
            // TODO update in model
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