import { createButton, createDiv, createInput, createLink } from '../Basics/Basics.js';

export default function renderSignupView() {

    const formHeader = createDiv({
        text: 'Welcome! Please, tell a little about you',
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

    // repeat password
    const repeatPasswordTitle = createDiv({
        text: 'Repeat password:',
        styles: ['input-title'],
    });
    const repeatPasswordInput = createInput({
        type: 'password',
        id: 'repeat-password-input',
        placeholder: '*****',
        styles: ['input'],
    });
    const groupBoxRepeatPassword = createDiv({
        styles: ['group-box']
    })
        .appendChildren(
            repeatPasswordTitle,
            repeatPasswordInput
        );

    // First name
    const firstNameTitle = createDiv({
        text: 'First Name:',
        styles: ['input-title'],
    });
    const firstNameInput = createInput({
        type: 'text',
        id: 'first-name-input',
        placeholder: 'George',
        styles: ['input'],
    });
    const groupBoxFirstName = createDiv({
        styles: ['group-box']
    })
        .appendChildren(
            firstNameTitle,
            firstNameInput
        );

    // Last name
    const lastNameTitle = createDiv({
        text: 'Last name:',
        styles: ['input-title'],
    });
    const lastNameInput = createInput({
        type: 'text',
        id: 'last-name-input',
        placeholder: 'Pupkin',
        styles: ['input'],
    });
    const groupBoxLastName = createDiv({
        styles: ['group-box']
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
                    id: 'signin',
                    text: 'Have an account?',
                    styles: ['link']
                }),
                createLink({
                    id: 'reset-password',
                    text: 'Forgot password?',
                    styles: ['form-footer-link']
                })
            )
    );

    const form = createDiv({
        styles: ['form-container']
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

    return form;

}