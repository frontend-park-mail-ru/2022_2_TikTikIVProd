import IComponent from '../IComponent/IComponent.js';
import createDiv from '../BasicComponentsCreators/CreateDiv/CreateDiv.js';
import createButton from '../BasicComponentsCreators/CreateButton/CreateButton.js';
import createLink from '../BasicComponentsCreators/CreateLink/CreateLink.js';
import createInput from '../BasicComponentsCreators/CreateInput/CreateInput.js';
import createForm from '../BasicComponentsCreators/CreateForm/CreateForm.js';
import signupFormViewConfig from './SignupFormViewConfig.js';
import { validateInput } from '../../utils/Validators/InputValidator/InputValidator.js';
export default class SignupFormView extends IComponent {
    constructor(parent) {
        super(parent);
        this.form = this.createForm();
    }
    render() {
        this.parent.appendChild(this.form);
    }
    createForm() {
        const form = createForm({
            id: 'signup-form',
            styles: ['form']
        });
        const formHeader = createDiv({
            text: signupFormViewConfig.title,
            styles: ['form__title'],
        });
        const formContent = createDiv({});
        signupFormViewConfig.fields.forEach((field) => {
            const title = createDiv({
                text: field.title,
                styles: ['form__input__title']
            });
            const input = createInput({
                type: field.type,
                id: field.id,
                placeholder: field.placeholder,
                styles: ['form__input'],
                dataset: field.dataset,
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
            id: signupFormViewConfig.submit.id,
            text: signupFormViewConfig.submit.text,
            styles: ['form__button'],
        });
        const formFooterWrapper = createDiv({
            styles: ['wrapper']
        });
        const formFooter = createDiv({
            styles: ['form__footer']
        });
        signupFormViewConfig.footer.forEach((link) => {
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
    bindSubmitForm(handler) {
        const submitButton = this.form.querySelector('#' + signupFormViewConfig.submit.id);
        if (submitButton === null) {
            // console.log(`No submit btn signup`);
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
    bindRedirect(handler) {
        signupFormViewConfig.footer.forEach((item) => {
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
    getData() {
        var _a;
        const data = new Map();
        let isCorrect = true;
        signupFormViewConfig.fields.forEach((item) => {
            var _a;
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
            if (!result.isValid) {
                // show error
                isCorrect = false;
                elem.classList.add('form__input__error');
                errorMsg.style.visibility = 'visible';
                errorMsg.textContent = result.msgError;
            }
        });
        if (!data.has('repeat_password') || !data.has('repeat_password') || data.get('repeat_password') !== data.get('password')) {
            isCorrect = false;
            const elem = this.form.querySelector('#repeat-password-input');
            if (elem !== null) {
                elem.classList.add('form__input__error');
                const errorMsg = (_a = elem.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.form__input__error__msg');
                errorMsg.style.display = 'visible';
                errorMsg.textContent = 'Пароли не совпадают';
            }
        }
        return { data, isCorrect };
    }
}
