import formTemplate from "../../Components/Form/Form.hbs";
import "../../Components/Form/Form.css"

import IView from "../IView/IView";
import signupViewConfig from "./SignupViewConfig";
import { IValidationResult } from "../../Utils/Validators/InputValidator/InputValidator";

/**
 * Отображение для страницы регистрации
 * @category SignupForm
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для формы регистрации
 */
 class SignupView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, formTemplate(signupViewConfig), '#' + signupViewConfig.formId);
    }

    /**
        * Функция добавления обработчика события нажатия на ссылки перехода в форме
        * @param  {any} listener - Callback функция для события
        * @returns {void}
        */
    public bindRedirect(listener: any): void {
        signupViewConfig.links.forEach((link) => {
            const elem = this.element.querySelector('#' + link.id);
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
        const submit = this.element.querySelector('#' + signupViewConfig.submit.id);
        if (submit === null) {
            // console.log('No submit btn signup view');
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
        signupViewConfig.inputs.forEach((input) => {
            const html = <HTMLInputElement>this.element.querySelector('#' + input.id);
            data.set(input.id, html.value);
        });
        return data;
    }

  /**
     * Функция вывода ошибки ввода в форме регистрации
     * @param  {string} id - ID поля в форме
     * @param  {IValidationResult} data - Результат проверки корректности вида
     * @returns {void}
     */
    public showError(id: string, data: IValidationResult): void {
        const input = <HTMLInputElement>this.element.querySelector('#' + id);
        const errorField = <HTMLElement>this.element.querySelector('#' + id + '-msg');
        if (data.isValid) {
            input.classList.remove('invalid');
            errorField.textContent = '';
            errorField.style.visibility = 'hidden';
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

export default SignupView;