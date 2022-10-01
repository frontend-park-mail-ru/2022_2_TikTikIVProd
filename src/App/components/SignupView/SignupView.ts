import IComponent from '../IComponent/IComponent.js';
import FooterView from '../FooterView/FooterView.js';
import createDiv from '../Basics/CreateDiv/CreateDiv.js';
import createButton from '../Basics/CreateButton/CreateButton.js';
import createLink from '../Basics/CreateLink/CreateLink.js';
import createInput from '../Basics/CreateInput/CreateInput.js';
import createForm from '../Basics/CreateForm/CreateForm.js';

export default class SignupView extends IComponent {

    // private onSubmitForm() ;
    constructor(parent: HTMLElement) {
        super(parent);
    }

    render() {

        const formHeader = createDiv({
            text: 'Welcome! Please, tell a little about you',
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
            .appendChildren(
                emailTitle,
                emailInput
            );

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
            .appendChildren(
                passwordTitle,
                passwordInput
            );

        // repeat password
        const repeatPasswordTitle = createDiv({
            text: 'Repeat password:',
            styles: ['input__title'],
        });
        const repeatPasswordInput = createInput({
            type: 'password',
            id: 'repeat-password-input',
            placeholder: '*****',
            styles: ['input'],
        });
        const groupBoxRepeatPassword = createDiv({
            styles: ['groupbox']
        })
            .appendChildren(
                repeatPasswordTitle,
                repeatPasswordInput
            );

        // First name
        const firstNameTitle = createDiv({
            text: 'First Name:',
            styles: ['input__title'],
        });
        const firstNameInput = createInput({
            type: 'text',
            id: 'first-name-input',
            placeholder: 'George',
            styles: ['input'],
        });
        const groupBoxFirstName = createDiv({
            styles: ['groupbox']
        })
            .appendChildren(
                firstNameTitle,
                firstNameInput
            );

        // Last name
        const lastNameTitle = createDiv({
            text: 'Last name:',
            styles: ['input__title'],
        });
        const lastNameInput = createInput({
            type: 'text',
            id: 'last-name-input',
            placeholder: 'Pupkin',
            styles: ['input'],
        });
        const groupBoxLastName = createDiv({
            styles: ['groupbox']
        })
            .appendChildren(
                lastNameTitle,
                lastNameInput
            );
        //btn submit 
        const submitBtn = createDiv({
            styles: ['wrapper']
        });
        submitBtn.appendChild(
            createButton({
                id: 'signup-submit-btn',
                text: 'Signup',
                styles: ['btn--submit-form'],
            })
        );

        const formFooter = createDiv({
            styles: ['wrapper']
        }).appendChildren(
            createDiv({
                styles: ['form__footer']
            })
                .appendChildren(
                    createLink({
                        id: 'signin',
                        text: 'Have an account?',
                        styles: ['form__footer__link']
                    }),
                    createLink({
                        id: 'reset-password',
                        text: 'Forgot password?',
                        styles: ['form__footer__link']
                    })
                )
        );

        const form = createForm({
            styles: ['form']
        })
            .appendChildren(
                formHeader,
                groupBoxFirstName,
                groupBoxLastName,
                groupBoxEmail,
                groupBoxPassword,
                groupBoxRepeatPassword,
                submitBtn,
                formFooter
            );

        this.parent.appendChild(form);
    }
}