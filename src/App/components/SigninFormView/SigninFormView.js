import IComponent from '../IComponent/IComponent.js';
import createDiv from '../BasicComponentsCreators/CreateDiv/CreateDiv.js';
import createButton from '../BasicComponentsCreators/CreateButton/CreateButton.js';
import createLink from '../BasicComponentsCreators/CreateLink/CreateLink.js';
import createInput from '../BasicComponentsCreators/CreateInput/CreateInput.js';
import createForm from '../BasicComponentsCreators/CreateForm/CreateForm.js';
import signinFormViewConfig from './SigninFormViewConfig.js';
import { validateInput } from '../../utils/Validators/InputValidator/InputValidator.js';
export default class SigninFormView extends IComponent {
    constructor(parent) {
        super(parent);
        this.form = this.createForm();
    }
    render() {
        this.parent.appendChild(this.form);
    }
    createForm() {
        const form = createForm({
            id: 'signin-form',
            styles: ['form']
        });
        const formHeader = createDiv({
            text: signinFormViewConfig.title,
            styles: ['form__title'],
        });
        const formContent = createDiv({ styles: ['form__content'] });
        signinFormViewConfig.fields.forEach((field) => {
            const title = createDiv({
                text: field.title,
                styles: ['form__input__title']
            });
            const input = createInput({
                type: field.type,
                id: field.id,
                placeholder: field.placeholder,
                dataset: field.dataset,
                styles: ['form__input'],
            });
            const errorBlock = createDiv({ styles: ['form__input__error__msg'] });
            const groupbox = createDiv({
                styles: ['groupbox']
            });
            groupbox.appendChild(title);
            groupbox.appendChild(input);
            groupbox.appendChild(errorBlock);
            formContent.appendChild(groupbox);
        });
        //btn submit 
        const submitBtn = createButton({
            id: signinFormViewConfig.submit.id,
            text: signinFormViewConfig.submit.text,
            styles: ['form__button'],
        });
        const formFooterWrapper = createDiv({
            styles: ['wrapper']
        });
        const formFooter = createDiv({
            styles: ['form__footer']
        });
        signinFormViewConfig.footer.forEach((link) => {
            formFooter.appendChild(createLink({
                id: link.id,
                text: link.text,
                href: link.href,
                styles: ['form__footer__link']
            }));
        });
        formFooterWrapper.appendChild(formFooter);
        form.appendChild(formHeader);
        form.appendChild(formContent);
        form.appendChild(submitBtn);
        form.appendChild(formFooterWrapper);
        return form;
    }
    bindRedirect(handler) {
        signinFormViewConfig.footer.forEach((item) => {
            const link = this.form.querySelector('#' + item.id);
            if (link === null) {
                // console.log(`no link ${item.id}`);
                return;
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(item.href);
            });
        });
    }
    bindSubmitForm(handler) {
        const submitButton = this.form.querySelector('#' + signinFormViewConfig.submit.id);
        if (submitButton === null) {
            // console.log('No submit btn');
            return;
        }
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const { data, isCorrect } = this.getData();
            if (isCorrect) {
                handler(data);
            }
        });
    }
    getData() {
        const data = new Map();
        let isCorrect = true;
        signinFormViewConfig.fields.forEach((item) => {
            var _a, _b;
            // Get data from view
            const elem = (this.form.querySelector('#' + item.id));
            if (elem === null) {
                isCorrect = false;
                return;
            }
            data.set(elem.dataset['model_field'], elem.value);
            elem.classList.remove('form__input__error');
            const errorMsg = (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.form__input__error__msg');
            errorMsg.style.visibility = 'hidden';
            // Validate
            const result = validateInput(elem.dataset['model_field'], elem.value);
            if (!result.isValid && elem.dataset['model_field'] != 'password') {
                // show error
                isCorrect = false;
                elem.classList.add('form__input__error');
                const errorMsg = (_b = elem.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('.form__input__error__msg');
                errorMsg.style.visibility = 'visible';
                errorMsg.textContent = result.msgError;
            }
        });
        return { data, isCorrect };
    }
    showErrorInvalidPassword() {
        var _a;
        const passwordField = this.form.querySelector('#password-input');
        if (passwordField === null) {
            return;
        }
        const errorMsg = (_a = passwordField.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.form__input__error__msg');
        errorMsg.style.visibility = 'visible';
        errorMsg.textContent = 'Неверный пароль';
    }
    showErrorNoSuchUser() {
        var _a;
        const emailField = this.form.querySelector('#email-input');
        if (emailField === null) {
            return;
        }
        const errorMsg = (_a = emailField.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.form__input__error__msg');
        errorMsg.style.visibility = 'visible';
        errorMsg.textContent = 'Неверный email или пароль';
    }
}
