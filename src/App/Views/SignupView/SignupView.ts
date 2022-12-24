import formTemplate from "../../Components/Form/Form.hbs";
import "../../Components/Form/Form.scss"

import sigupTemplate from "./SignupView.hbs"
import "./SignupView.scss"

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
        super(parent, sigupTemplate({}), '.signup-container');
        this.element.innerHTML = formTemplate(signupViewConfig);
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
            // // console.log('No submit btn signup view');
            return;
        }

        submit.addEventListener('click', listener.bind(this));
    }

 /**
     * Функция извлечения введённых данных из формы
     * @returns {Map<string, string>}
     */
    public getData(): Map<string, string> {
        const data = new Map<string, string>();
        signupViewConfig.inputs.forEach((input) => {
            const html = <HTMLInputElement>this.element.querySelector('#' + input.id);
            data.set(input.id, html.value.trim());
        });
        return data;
    }

    /**
     * Функция отображения сообщения об ошибке в поле формы
     * @param  {string} id - Идентификатор поля
     * @param  {string} msg - Сообщение об ошибке
     * @return {void}
     */
    public showErrorMsg(id: string, msg: string) : void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.input-with-title');
        if (!inpt) {
            return;
        }
        inpt.classList.add('input-with-title--error');
        (<HTMLElement>inpt.querySelector('.input-with-title__error-msg')).innerHTML = msg;
    }
    
    /**
     * Функция скрытия сообщения об ошибке в поле формы
     * @param  {string} id - Идентификатор поля
     * @return {void}
     */
    public hideErrorMsg(id: string) : void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id)?.closest('.input-with-title');
        if (!inpt) {
            return;
        }
        inpt.classList.remove('input-with-title--error');
    }
}

export default SignupView;