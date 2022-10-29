import formTemplate from "../../Components/Form/Form.hbs";
import "../../Components/Form/Form.css"

import IView from "../IView/IView";
import signinViewConfig from "./SigninViewConfig";
import { IValidationResult } from "../../Utils/Validators/InputValidator/InputValidator";

/**
 * Отображение для страницы авторизации
 * @category SigninForm
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для формы авторизации
 */
class SigninView extends IView {
    constructor(parent: HTMLElement) {
        super(parent, formTemplate(signinViewConfig), '#' + signinViewConfig.formId);
    }

    /**
        * Функция добавления обработчика события нажатия на ссылки перехода в форме
        * @param  {any} listener - Callback функция для события
        * @returns {void}
        */
    public bindRedirect(listener: any): void {
        signinViewConfig.links.forEach((link) => {
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
        const submit = this.element.querySelector('#' + signinViewConfig.submit.id);
        if (submit === null) {
            // console.log('No submit btn signin view');
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
            const html = <HTMLInputElement>this.element.querySelector('#' + input.id);
            data.set(input.id, html.value);
        });
        return data;
    }

    public showErrorMsg(id: string, msg: string): void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id);
        const msgField = <HTMLElement>this.element.querySelector('#' + id + '-msg');
        if (!inpt || !msgField) {
            return;
        }
        inpt.classList.add('invalid');
        msgField.innerText = msg;
        msgField.style.visibility = 'visible';
    }

    public hideErrorMsg(id: string): void {
        const inpt = <HTMLElement>this.element.querySelector('#' + id);
        const msgField = <HTMLElement>this.element.querySelector('#' + id + '-msg');
        if (!inpt || !msgField) {
            return;
        }
        inpt.classList.remove('invalid');
        msgField.innerText = '';
        msgField.style.visibility = 'hidden';
    }
}

export default SigninView;