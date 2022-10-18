import IController from "../IController/IController.ts";
import UserModel from "../../Models/UserModel/UserModel.ts";
import { IUserSignUp } from "../../Models/UserModel/UserModel.ts"
import SignupView from "../../Views/SignupView/SignupView.ts";
import { IValidatedData } from "../../Views/SigninView/SigninView.ts";
import emailValidator from "../../Utils/Validators/EmailValidator/EmailValidator.ts";
import firstNameValidator from "../../Utils/Validators/FirstNameValidator/FirstNameValidator.ts";
import lastNameValidator from "../../Utils/Validators/LastNameValidator/LastNameValidator.ts";
import nicknameValidator from "../../Utils/Validators/NicknameValidator/NicknamaValidator.ts";
import passwordValidator from "../../Utils/Validators/PasswordValidator/PasswordValidator.ts";
import router from "../../Router/Router.ts";
import paths from "../../Router/RouterPaths.ts";

export default class SignupController extends IController<SignupView, UserModel> {
    constructor(view: SignupView, model: UserModel) {
        super(view, model);
        this.view.bindSubmit(this.onSubmit.bind(this));
        this.view.bindRedirect(this.onRedirect.bind(this));
    }

    private onRedirect(e: Event) {
        e.preventDefault();
        if (this.isMounted) {
            router.goToPath((<HTMLLinkElement>e.target).getAttribute('href') || '');
        }
    }

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

    private validate(data: Map<string, string>): {
        isValidData: boolean,
        validatedData: Map<string, IValidatedData>
    } {
        let isValidData = true;
        const validatedData = new Map<string, IValidatedData>;

        data.forEach((value, id) => {
            switch (id) {
                case 'first_name': {
                    const { isValid, msg } = firstNameValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'last_name': {
                    const { isValid, msg } = lastNameValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'nick_name': {
                    const { isValid, msg } = nicknameValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'email': {
                    const { isValid, msg } = emailValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'password': {
                    const { isValid, msg } = passwordValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'email': {
                    const { isValid, msg } = emailValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'repeat_password': {
                    if (value !== data.get('password')) {
                        validatedData.set(id, { isValid: false, msg: 'Пароли должны совпадать' });
                    } else {
                        validatedData.set(id, { isValid: true, msg: '' });
                    }
                    break;
                }

                default: {
                    validatedData.set(id, { isValid: true, msg: '' });
                    break;
                }
            }
        });

        return { isValidData, validatedData };
    }
}