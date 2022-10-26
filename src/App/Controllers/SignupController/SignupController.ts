import IController from "../IController/IController";
import UserModel from "../../Models/UserModel/UserModel";
import { IUserSignUp } from "../../Models/UserModel/UserModel"
import SignupView from "../../Views/SignupView/SignupView";
import router from "../../Router/Router";
import paths from "../../Router/RouterPaths";
import validateInput, { IValidationResult } from "../../Utils/Validators/InputValidator/InputValidator";

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
            const data: Map<string, string> = this.view.getData();

            const { isValidData, validatedData } = this.validate(data);
            this.view.showErrors(validatedData);
            if (!isValidData) {
                console.log('invalid data');
                return;
            }

            console.log('valid data');

            const user: IUserSignUp = {
                first_name: data.get('first_name') || '',
                last_name: data.get('last_name') || '',
                nick_name: data.get('nick_name') || '',
                email: data.get('email') || '',
                password: data.get('password') || ''
            };

            console.log(user);

            this.model.registerUser(user).then(({ status, body }) => {
                console.log(status, body);
                router.goToPath(paths.feedPage);
            }).catch(({ status, body }) => {
                console.log(status, body);
                switch (status) {
                    // case 401:
                    // case 404: {
                    //     this.view.showError('email', { isValid: false, msg: 'Неверный email или пароль' });
                    //     break;
                    // }
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
            if (id === 'repeat_password') {
                if (value !== data.get('password')) {
                    validatedData.set(id, { isValid: false, msg: 'Пароли должны совпадать' });
                } else {
                    validatedData.set(id, { isValid: true, msg: '' });
                }
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

export default SignupController;