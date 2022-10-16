import formTemplate from "../../Components/Form/Form.js";
import IView from "../IView/IView.js";
import signinViewConfig from "./SigninViewConfig.js";
export default class SigninView extends IView {
    constructor(parent) {
        super(parent);
        const parser = new DOMParser();
        const form = parser.parseFromString(formTemplate(signinViewConfig), 'text/html').querySelector('#' + signinViewConfig.formId);
        if (form === null) {
            throw Error();
        }
        this.form = form;
    }
    show(opts) {
        this.parent.appendChild(this.form);
    }
    hide(opts) {
        this.parent.removeChild(this.form);
    }
    bindRedirect(listener) {
        signinViewConfig.links.forEach((link) => {
            const elem = this.form.querySelector('#' + link.id);
            if (elem !== null) {
                elem.addEventListener('click', listener.bind(this));
            }
        });
    }
    bindSubmit(listener) {
        const submit = this.form.querySelector('#' + signinViewConfig.submit.id);
        if (submit === null) {
            console.log('No submit btn signin view');
            return;
        }
        submit.addEventListener('click', listener.bind(this));
    }
    unbindRedirect(listener) {
        signinViewConfig.links.forEach((link) => {
            const elem = this.form.querySelector('#' + link.id);
            if (elem !== null) {
                elem.removeEventListener('click', listener.bind(this));
            }
        });
    }
    unbindSubmit(listener) {
        const submit = this.form.querySelector('#' + signinViewConfig.submit.id);
        if (submit === null) {
            console.log('No submit btn signin view');
            return;
        }
        submit.removeEventListener('click', listener.bind(this));
    }
    getData() {
        const data = new Map();
        signinViewConfig.inputs.forEach((input) => {
            const html = this.form.querySelector('#' + input.id);
            data.set(input.id, html.value);
        });
        return data;
    }
    showError(id, data) {
        const input = this.form.querySelector('#' + id);
        const errorField = this.form.querySelector('#' + id + '-msg');
        if (data.isValid) {
            input.classList.remove('invalid');
            errorField.style.visibility = 'hidden';
            errorField.textContent = '';
        }
        else {
            input.classList.add('invalid');
            errorField.textContent = data.msg;
            errorField.style.visibility = 'visible';
        }
    }
    showErrors(data) {
        data.forEach((value, id) => {
            this.showError(id, value);
        });
    }
}
