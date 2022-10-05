import IComponent from '../IComponent/IComponent.js';
import createDiv from '../BasicComponentsCreators/CreateDiv/CreateDiv.js';
import createButton from '../BasicComponentsCreators/CreateButton/CreateButton.js';
import createLink from '../BasicComponentsCreators/CreateLink/CreateLink.js';
import createInput from '../BasicComponentsCreators/CreateInput/CreateInput.js';
import createForm from '../BasicComponentsCreators/CreateForm/CreateForm.js';
import signupFormConfig from './SignupFormViewConfig.js';
export default class SignupFormView extends IComponent {
    constructor(parent) {
        super(parent);
        this.isShowing = false;
    }
    render() {
        const form = createForm({
            id: 'signup-form',
            styles: ['form']
        });
        const formHeader = createDiv({
            text: signupFormConfig.title,
            styles: ['form__title'],
        });
        const formContent = createDiv({});
        signupFormConfig.fields.forEach((field) => {
            const title = createDiv({
                text: field.title,
                styles: ['form__input__title']
            });
            const input = createInput({
                type: field.type,
                id: field.id,
                placeholder: field.placeholder,
                styles: ['form__input'],
            });
            const groupbox = createDiv({
                styles: ['groupbox']
            });
            groupbox.appendChild(title);
            groupbox.appendChild(input);
            formContent.appendChild(groupbox);
        });
        //btn submit 
        const submitBtn = createButton({
            id: signupFormConfig.submit.id,
            text: signupFormConfig.submit.text,
            styles: ['form__button'],
        });
        const formFooterWrapper = createDiv({
            styles: ['wrapper']
        });
        const formFooter = createDiv({
            styles: ['form__footer']
        });
        signupFormConfig.footer.forEach((link) => {
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
        this.parent.appendChild(form);
        this.isShowing = true;
    }
}
