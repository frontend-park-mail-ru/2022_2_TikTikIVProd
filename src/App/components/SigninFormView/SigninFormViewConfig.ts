import { IButtonProps } from "../BasicComponentsCreators/CreateButton/CreateButton.js";
import { IInputProps } from "../BasicComponentsCreators/CreateInput/CreateInput.js";
import { ILinkProps } from "../BasicComponentsCreators/CreateLink/CreateLink.js";

interface IInputWithTitle extends IInputProps {
    title: string;
}

interface ISigninForm {
    title: string;
    fields: IInputWithTitle[];
    submit: IButtonProps;
    footer: ILinkProps[];
}


const signinConfig: ISigninForm = {
    title: 'Добро пожаловать!',
    fields: [
        {
            title: 'E-mail:',
            type: 'email',
            id: 'email-input',
            placeholder: 'George@domain.com',
        },
        {
            title: 'Пароль:',
            type: 'password',
            id: 'password-input',
            placeholder: '*****',
        }
    ],
    submit: {
        id: 'signin-submit-btn',
        text: 'Войти',
    },
    footer: [
        {
            href: '/signup',
            id: 'link-signup',
            text: 'Нет аккаунта?',
        },
        {
            href: '#',
            id: 'link-reset-password',
            text: 'Забыли пароль?'
        }
    ],
}


export default signinConfig;