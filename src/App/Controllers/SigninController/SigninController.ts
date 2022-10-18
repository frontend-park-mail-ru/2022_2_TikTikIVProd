import IController from "../IController/IController.ts";
import UserModel from "../../Models/UserModel/UserModel.ts";
import { IUserSignIn } from "../../Models/UserModel/UserModel.ts"
import SigninView from "../../Views/SigninView/SigninView.ts";
import { IValidatedData } from "../../Views/SigninView/SigninView.ts";
import emailValidator from "../../Utils/Validators/EmailValidator/EmailValidator.ts";
import router from "../../Router/Router.ts";

export default class SigninController extends IController<SigninView, UserModel> {
    constructor(view: SigninView, model: UserModel) {
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

            const user: IUserSignIn = {
                email: data.get('email') || '',
                password: data.get('password') || '',
            };

            this.model.authUser(user).then(({ status, body }) => {
                console.log('auth success');
            }).catch(({ status, body }) => {
                console.log('auth failure');
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

    private validate(data: Map<string, string>): {
        isValidData: boolean,
        validatedData: Map<string, IValidatedData>
    } {
        let isValidData = true;
        const validatedData = new Map<string, IValidatedData>;

        data.forEach((value, id) => {
            switch (id) {
                case 'email': {
                    const { isValid, msg } = emailValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) { isValidData = false; }
                    break;
                }
                case 'password':
                default: {
                    validatedData.set(id, { isValid: true, msg: '' });
                    break;
                }
            }
        });

        return { isValidData, validatedData };
    }
}