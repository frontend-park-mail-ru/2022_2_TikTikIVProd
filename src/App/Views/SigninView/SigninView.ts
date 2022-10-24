import formTemplate from "../../Components/Form/Form.hbs";
import { IValidationResult } from "../../Utils/Validators/IValidationResult/IValidationResult";
import IView from "../IView/IView";
import signinViewConfig from "./SigninViewConfig";

/**
 * Отображение для страницы авторизации
 * @category SigninForm
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для формы авторизации
 */
class SigninView extends IView {
    /**
     * Элемент формы
     * (приватное поле класса)
     */
    private form: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        const parser = new DOMParser();

        const form: HTMLElement | null = parser.parseFromString(formTemplate(signinViewConfig), 'text/html').querySelector('#' + signinViewConfig.formId);
        if (form === null) {
            throw Error();
        }
        this.form = form;
    }

    /**
     * Реализация метода отрисовки вида
     * @returns {void}
     */
    public show(opts?: any): void {
        this.parent.appendChild(this.form);
    }

    /**
     * Реализация метода скрытия вида
     * @returns {void}
     */
    public hide(opts?: any): void {
        this.parent.removeChild(this.form);
    }

    /**
        * Функция добавления обработчика события нажатия на ссылки перехода в форме
        * @param  {any} listener - Callback функция для события
        * @returns {void}
        */
    public bindRedirect(listener: any): void {
        signinViewConfig.links.forEach((link) => {
            const elem = this.form.querySelector('#' + link.id);
            if (elem !== null) {
                elem.addEventListener('click', listener.bind(this));
            }
        });
    }

    /**
        * Функция добавления обработчика события нажатия на отправку формы
        * @param  {any} listener - Callback функция для события
        * @returns {void}
        */
    public bindSubmit(listener: any): void {
        const submit = this.form.querySelector('#' + signinViewConfig.submit.id);
        if (submit === null) {
            console.log('No submit btn signin view');
            return;
        }

        submit.addEventListener('click', listener.bind(this));
    }

    
    /**
     * Функция извлечения введённых данных из формы
     * @returns {Map}
     */
    public getData(): Map<string, string> {
        const data = new Map<string, string>();
        signinViewConfig.inputs.forEach((input) => {
            const html = <HTMLInputElement>this.form.querySelector('#' + input.id);
            data.set(input.id, html.value);
        });
        return data;
    }
    
    /**
     * Функция вывода ошибки ввода в форме авторизации
     * @param  {string} id - ID поля в форме
     * @param  {IValidationResult} data - Результат проверки корректности вида
     * @returns {void}
     */
    public showError(id: string, data: IValidationResult): void {
        const input = <HTMLInputElement>this.form.querySelector('#' + id);
        const errorField = <HTMLElement>this.form.querySelector('#' + id + '-msg');
        if (data.isValid) {
            input.classList.remove('invalid');
            errorField.style.visibility = 'hidden';
            errorField.textContent = '';
        } else {
            input.classList.add('invalid');
            errorField.textContent = data.msg;
            errorField.style.visibility = 'visible';
        }
    }

    /**
     * Функиция вывода ошибок в нескольких полях 
     * @param  {Map} data - Карта ID поля формы -> Результат проверки
     * @returns {void}
     */
    public showErrors(data: Map<string, IValidationResult>): void {
        data.forEach((value, id) => {
            this.showError(id, value);
        });
    }
}

export default SigninView;