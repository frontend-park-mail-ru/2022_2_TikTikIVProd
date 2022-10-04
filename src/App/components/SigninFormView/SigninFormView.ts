import IComponent from '../IComponent/IComponent.js';
import createDiv from '../BasicComponentsCreators/CreateDiv/CreateDiv.js';
import createButton from '../BasicComponentsCreators/CreateButton/CreateButton.js';
import createLink from '../BasicComponentsCreators/CreateLink/CreateLink.js';
import createInput from '../BasicComponentsCreators/CreateInput/CreateInput.js';
import createForm from '../BasicComponentsCreators/CreateForm/CreateForm.js';

import signinFormConfig from './SigninFormViewConfig.js';

export default class SigninFormView extends IComponent {

    private isShowing: boolean;

    constructor(parent: HTMLElement) {
        super(parent);
        this.isShowing = false;
    }

    render() {
        const form = createForm({
            id: 'signin-form',
            styles: ['form']
        });

        const formHeader = createDiv({
            text: signinFormConfig.title,
            styles: ['form__title'],
        });

        const formContent = createDiv({});
        signinFormConfig.fields.forEach((field) => {
            const title = createDiv({
                text: field.title,
                styles: ['input__title']
            });
            const input = createInput({
                type: field.type,
                id: field.id,
                placeholder: field.placeholder,
                styles: ['input'],
            });
            const groupbox = createDiv({
                styles: ['groupbox']
            });
            groupbox.appendChild(title);
            groupbox.appendChild(input);
            formContent.appendChild(groupbox);
        });

        //btn submit 
        const submitBtn = createDiv({
            styles: ['wrapper']
        });
        submitBtn.appendChild(
            createButton({
                id: signinFormConfig.submit.id,
                text: signinFormConfig.submit.text,
                styles: ['btn--submit-form'],
            })
        );

        const formFooterWrapper = createDiv({
            styles: ['wrapper']
        });
        const formFooter = createDiv({
            styles: ['form__footer']
        });
        signinFormConfig.footer.forEach((link) => {
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