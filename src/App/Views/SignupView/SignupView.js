import formTemplate from "../../Components/Form/Form.js";
import IView from "../IView/IView.js";
import signupViewConfig from "./SignupViewConfig.js";
import sigupViewConfig from "./SignupViewConfig.js";
export default class SignupView extends IView {
    constructor(parent) {
        super(parent);
        const parser = new DOMParser();
        const form = parser.parseFromString(formTemplate(sigupViewConfig), 'text/html').querySelector('#' + signupViewConfig.formId);
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
        signupViewConfig.links.forEach((link) => {
            const elem = this.form.querySelector('#' + link.id);
            if (elem !== null) {
                elem.addEventListener('click', listener.bind(this));
            }
        });
    }
    bindSubmit(listener) {
        const submit = this.form.querySelector('#' + sigupViewConfig.submit.id);
        if (submit === null) {
            console.log('No submit btn signup view');
            return;
        }
        submit.addEventListener('click', listener.bind(this));
    }
    unbindRedirect(listener) {
        signupViewConfig.links.forEach((link) => {
            const elem = this.form.querySelector('#' + link.id);
            if (elem !== null) {
                elem.removeEventListener('click', listener.bind(this));
            }
        });
    }
    unbindSubmit(listener) {
        const submit = this.form.querySelector('#' + sigupViewConfig.submit.id);
        if (submit === null) {
            console.log('No submit btn signup view');
            return;
        }
        submit.removeEventListener('click', listener.bind(this));
    }
    getData() {
        const data = new Map();
        sigupViewConfig.inputs.forEach((input) => {
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
            errorField.textContent = '';
            errorField.style.visibility = 'hidden';
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
