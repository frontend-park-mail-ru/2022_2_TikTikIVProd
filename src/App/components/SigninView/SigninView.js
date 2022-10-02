import IComponent from '../IComponent/IComponent.js';
import createDiv from '../Basics/CreateDiv/CreateDiv.js';
import createButton from '../Basics/CreateButton/CreateButton.js';
import createLink from '../Basics/CreateLink/CreateLink.js';
import createInput from '../Basics/CreateInput/CreateInput.js';
import createForm from '../Basics/CreateForm/CreateForm.js';
export default class SigninView extends IComponent {
    // private onSubmitForm() ;
    constructor(parent) {
        super(parent);
    }
    render() {
        const formHeader = createDiv({
            text: 'Welcome back! Please login',
            styles: ['form__title'],
        });
        // email
        const emailTitle = createDiv({
            text: 'Email',
            styles: ['input__title']
        });
        const emailInput = createInput({
            type: 'email',
            id: 'email-input',
            placeholder: 'my_email@domain.com',
            styles: ['input'],
        });
        const groupBoxEmail = createDiv({
            styles: ['groupbox']
        })
            .appendChildren(emailTitle, emailInput);
        // password
        const passwordTitle = createDiv({
            text: 'Password:',
            styles: ['input__title'],
        });
        const passwordInput = createInput({
            type: 'password',
            id: 'password-input',
            placeholder: '*****',
            styles: ['input'],
        });
        const groupBoxPassword = createDiv({
            styles: ['groupbox']
        })
            .appendChildren(passwordTitle, passwordInput);
        //btn submit 
        const submitBtn = createDiv({
            styles: ['wrapper']
        });
        submitBtn.appendChild(createButton({
            id: 'auth-submit-btn',
            text: 'Login',
            styles: ['btn--submit-form'],
        }));
        const formFooter = createDiv({
            styles: ['wrapper']
        }).appendChildren(createDiv({
            styles: ['form__footer']
        })
            .appendChildren(createLink({
            id: 'reset-password',
            text: 'Forgot password',
            styles: ['form__footer__link']
        }), createLink({
            id: 'signup',
            text: 'Do not have an account?',
            styles: ['form__footer__link']
        })));
        const form = createForm({
            styles: ['form']
        });
        form
            .appendChildren(formHeader, groupBoxEmail, groupBoxPassword, submitBtn, formFooter);
        this.parent.appendChild(form);
    }
}
