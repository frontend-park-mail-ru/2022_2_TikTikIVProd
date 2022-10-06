import { IButtonProps } from "../BasicComponentsCreators/CreateButton/CreateButton.js";
import { IInputProps } from "../BasicComponentsCreators/CreateInput/CreateInput.js";
import { ILinkProps } from "../BasicComponentsCreators/CreateLink/CreateLink.js";

interface IInputWithTitle extends IInputProps {
    title: string;
}

interface ISignupFormView {
    title: string;
    fields: IInputWithTitle[];
    submit: IButtonProps;
    footer: ILinkProps[];
}


const signupFormConfig: ISignupFormView = {
    title: 'Рады вас приветствовать!',
    fields: [
        {
            title: 'Ваше имя:',
            type: 'text',
            id: 'fist-name-input',
            placeholder: 'Георгий',
            dataset: 'first_name',
        },
        {
            title: 'Ваша фамилия:',
            type: 'text',
            id: 'last-name-input',
            placeholder: 'Пупкин',
            dataset: 'last_name',
        },
        {
            title: 'Придумайте псевдоним:',
            type: 'text',
            id: 'nickname-input',
            placeholder: 'GeorgePupkin123',
            dataset: 'nick_name',
        },
        {
            title: 'E-mail:',
            type: 'email',
            id: 'email-input',
            placeholder: 'George@domain.com',
            dataset: 'email',
        },
        {
            title: 'Пароль:',
            type: 'password',
            id: 'password-input',
            placeholder: '*****',
            dataset: 'password',
        },
        {
            title: 'Введите пароль ещё раз:',
            type: 'password',
            id: 'repeat-password-input',
            placeholder: '*****',
            dataset: 'repeat_password',
        }
    ],
    submit: {
        id: 'signup-submit-btn',
        text: 'Зарегистрироваться',
    },
    footer: [
        {
            href: '/signin',
            id: 'link-signin',
            text: 'Уже есть аккаунт?',
        },
        // {
        //     href: '#',
        //     id: 'link-reset-password',
        //     text: 'Забыли пароль?'
        // }
    ],
}


export default signupFormConfig;