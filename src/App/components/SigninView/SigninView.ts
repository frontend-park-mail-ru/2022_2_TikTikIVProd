import IComponent from '../IComponent/IComponent.js';
import { createButton, createDiv, createInput, createLink } from '../Basics/Basics.js';

export default class SigninView extends IComponent {

    // private onSubmitForm() ;
    constructor(parent: HTMLElement) {
        super(parent);
    }

    render() {

        const formHeader = createDiv({
            text: 'Welcome back! Please login',
            styles: ['form-title'],
        });

        // email
        const emailTitle = createDiv({
            text: 'Email',
            styles: ['input-title']
        });
        const emailInput = createInput({
            type: 'email',
            id: 'email-input',
            placeholder: 'my_email@domain.com',
            styles: ['input'],
        });
        const groupBoxEmail = createDiv({
            styles: ['group-box']
        })
            .appendChildren(
                emailTitle,
                emailInput
            );

        // password
        const passwordTitle = createDiv({
            text: 'Password:',
            styles: ['input-title'],
        });
        const passwordInput = createInput({
            type: 'password',
            id: 'password-input',
            placeholder: '*****',
            styles: ['input'],
        });
        const groupBoxPassword = createDiv({
            styles: ['group-box']
        })
            .appendChildren(
                passwordTitle,
                passwordInput
            );

        //btn submit 
        const submitBtn = createDiv({
            styles: ['wrapper']
        });
        submitBtn.appendChild(
            createButton({
                id: 'auth-submit-btn',
                text: 'Login',
                styles: ['btn--submit'],
            })
        );

        const formFooter = createDiv({
            styles: ['wrapper']
        }).appendChildren(
            createDiv({
                styles: ['form-footer']
            })
                .appendChildren(
                    createLink({
                        id: 'reset-password',
                        text: 'Forgot password',
                        styles: ['form-footer-link']
                    }),
                    createLink({
                        id: 'signup',
                        text: 'Do not have an account?',
                        styles: ['link']
                    })
                )
        );

        const form = createDiv({
            styles: ['form-container']
        })
            .appendChildren(
                formHeader,
                groupBoxEmail,
                groupBoxPassword,
                submitBtn,
                formFooter
            );

        this.parent.appendChild(form);

    }
}