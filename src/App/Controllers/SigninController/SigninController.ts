import IController from "../IController/IController";
import UserModel from "../../Models/UserModel/UserModel";
import { IUserSignIn } from "../../Models/UserModel/UserModel"
import SigninView from "../../Views/SigninView/SigninView";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import validateInput, { IValidationResult } from "../../Utils/Validators/InputValidator/InputValidator";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";

/**
 * Контроллер для страницы авторизации
 * @category SigninForm
 * @extends {IController}
 * @param  {SigninView} view Объект вида формы авторизации
 * @param  {UserModel} model Объект модели пользователя
 */
class SigninController extends IController<SigninView, UserModel> {
    constructor(view: SigninView, model: UserModel) {
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
    private onRedirect(e: Event): void {
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
            const data: Map<string, string> = this.view.getData();

            const isValidData = this.validate(data);
            if (!isValidData) {
                return;
            }

            const user: IUserSignIn = {
                email: data.get('email') || '',
                password: data.get('password') || '',
            };

            this.model.signInUser(user).then(() => {
                router.goToPath(paths.feedPage);
            }).catch((msg) => {
                this.view.showErrorMsg('email', msg);
            });
        }
    }

    /**
     * Функция проверки данных из формы
     * (приватное поле класса)
     * @param {Map} data Данные из формы в формате ID поля -> значение
     * @return {{boolean, Map<string, IValidationResult>}}
     */
    private validate(data: Map<string, string>): boolean {
        let isValidData = true;

        data.forEach((value, id) => {
            if (id === 'password') {
                return;
            }
            const { isValid, msg } = validateInput(id, value);
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

export default SigninController;