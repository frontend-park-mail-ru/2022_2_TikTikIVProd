import IController from "../IController/IController.js";
import emailValidator from "../../Utils/Validators/EmailValidator/EmailValidator.js";
import router from "../../Router/Router.js";
export default class SigninController extends IController {
    constructor(view, model) {
        super(view, model);
    }
    mountComponent() {
        if (!this.isMounted) {
            this.view.bindSubmit(this.onSubmit.bind(this));
            this.view.bindRedirect(this.onRedirect.bind(this));
            this.view.show();
            this.isMounted = true;
        }
    }
    unmountComponent() {
        if (this.isMounted) {
            this.view.unbindSubmit(this.onSubmit.bind(this));
            this.view.unbindRedirect(this.onRedirect.bind(this));
            this.view.hide();
        }
        this.isMounted = false;
    }
    onRedirect(e) {
        e.preventDefault();
        router.goToPath(e.target.getAttribute('href') || '');
    }
    onSubmit(e) {
        e.preventDefault();
        const data = this.view.getData();
        const { isValidData, validatedData } = this.validate(data);
        this.view.showErrors(validatedData);
        if (!isValidData) {
            console.log('invalid data');
            return;
        }
        console.log('valid data');
        const user = {
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
    validate(data) {
        let isValidData = true;
        const validatedData = new Map;
        data.forEach((value, id) => {
            switch (id) {
                case 'email': {
                    const { isValid, msg } = emailValidator(value);
                    validatedData.set(id, { isValid, msg });
                    if (!isValid) {
                        isValidData = false;
                    }
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
