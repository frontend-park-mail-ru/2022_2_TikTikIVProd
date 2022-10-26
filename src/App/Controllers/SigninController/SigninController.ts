import IController from "../IController/IController";
import UserModel from "../../Models/UserModel/UserModel";
import { IUserSignIn } from "../../Models/UserModel/UserModel"
import SigninView from "../../Views/SigninView/SigninView";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import validateInput, { IValidationResult } from "../../Utils/Validators/InputValidator/InputValidator";

/**
 * Котроллер для страницы авторизации
 * @category SigninForm
 * @extends {IController}
 * @param  {SigninView} view Объект вида формы авторизации
 * @param  {UserModel} model Объект модели пользователя
 */
class SigninController extends IController<SigninView, UserModel> {
    constructor(view: SigninView, model: UserModel) {
        super(view, model);
        this.view.bindSubmit(this.onSubmit.bind(this));
        this.view.bindRedirect(this.onRedirect.bind(this));
    }

    /**
     * Функция обработки события нажатия на блок ссылок формы
     * (приватное поле класса)
     * @param  {Event} e Объект события 
     * @returns {void}
     */
    private onRedirect(e: Event) : void {
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


            const { isValidData, validatedData } = this.validate(data);
            this.view.showErrors(validatedData);
            if (!isValidData) {
                console.log('invalid data: ', validatedData);
                return;
            }

            const user: IUserSignIn = {
                email: data.get('email') || '',
                password: data.get('password') || '',
            };

            this.model.authUser(user).then(({ status, body }) => {
                console.log('auth success');
                router.goToPath(paths.feedPage);
            }).catch(({ status, body }) => {
                console.log('auth failure ', status, body);
                switch (status) {
                    case 401:
                    case 404: {
                        this.view.showError('email', { isValid: false, msg: 'Неверный email или пароль' });
                        break;
                    }
                    default: {
                        this.view.showError('email', { isValid: false, msg: `Ошибка сервера ${status}` });
                        break;
                    }
                }
            });
        }
    }

    /**
     * Функция проверки данных из формы
     * (приватное поле класса)
     * @param {Map} data Данные из формы в формате ID поля -> значение
     * @return {{boolean, Map<string, IValidationResult>}}
     */
    private validate(data: Map<string, string>): {
        isValidData: boolean,
        validatedData: Map<string, IValidationResult>
    } {
        let isValidData = true;
        const validatedData = new Map<string, IValidationResult>;

        data.forEach((value, id) => {
            if(id === 'password') {
                return;
            }
            const { isValid, msg } = validateInput(id, value);
            validatedData.set(id, { isValid, msg });
            if (!isValid) { 
                isValidData = false; 
            }
        });

        return { isValidData, validatedData };
    }
}

export default SigninController;