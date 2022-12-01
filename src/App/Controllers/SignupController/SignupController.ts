import IController from "../IController/IController";
import UserModel from "../../Models/UserModel/UserModel";
import { IUserSignUp } from "../../Models/UserModel/UserModel"
import SignupView from "../../Views/SignupView/SignupView";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import validateInput, { IValidationResult } from "../../Utils/Validators/InputValidator/InputValidator";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";

/**
 * Котроллер для страницы авторизации
 * @category SignupForm
 * @extends {IController}
 * @param  {SignupView} view Объект вида формы авторизации
 * @param  {UserModel} model Объект модели пользователя
 */
class SignupController extends IController<SignupView, UserModel> {
    constructor(view: SignupView, model: UserModel) {
        super(view, model);
        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        this.view.bindSubmit(this.onSubmit.bind(this));
        this.view.bindRedirect(this.onRedirect.bind(this));
    }

    /**
     * Функция обработки события нажатия на блок ссылок формы
     * (приватное поле класса)
     * @param  {Event} e Объект события 
     * @returns {void}
     */
    private onRedirect(e: Event) {
        e.preventDefault();
        if (this.isMounted) {
            router.goToPath((<HTMLLinkElement>e.target).getAttribute('href') || '');
        }
    }

    /**
     * Функция обработки события отправки формы
     * (приватное поле класса)
     * @param  {Event} e Объект события 
     * @returns {void}
     */
    private onSubmit(e: Event): void {
        e.preventDefault();
        if (this.isMounted) {
            const data = this.view.getData();

            const isValidData = this.validate(data);
            if (!isValidData) {
                return;
            }

            const user: IUserSignUp = {
                first_name: data.get('first_name') || '',
                last_name: data.get('last_name') || '',
                nick_name: data.get('nick_name') || '',
                email: data.get('email') || '',
                password: data.get('password') || ''
            };

            this.model.signUpUser(user).then(() => {
                router.goToPath(paths.feedPage);
            }).catch(msg => {
                this.view.showErrorMsg('email', msg);
            });
        }
    }

    /**
     * Функция проверки данных из формы
     * (приватное поле класса)
     * @param {Map<string, string>} data Данные из формы в формате ID поля -> значение
     * @return {boolean}
     */
    private validate(data: Map<string, string>): boolean {
        let isValidData = true;

        data.forEach((value, id) => {
            let ref: string | undefined = undefined;
            if (id === 'repeat_password') {
                ref = data.get('password');
            }

            const { isValid, msg } = validateInput(id, value, ref);
            if (!isValid) {
                isValidData = false;
                this.view.showErrorMsg(id, msg);
                return;
            }
            this.view.hideErrorMsg(id);
        });
        return isValidData;
    }
}

export default SignupController;