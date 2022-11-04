const signinFormConfig = {
    title: 'Добро пожаловать!',
    fields: [
        {
            title: 'E-mail:',
            type: 'email',
            id: 'email-input',
            dataset: { key: 'model_field', value: 'email' },
            placeholder: 'George@domain.com',
        },
        {
            title: 'Пароль:',
            type: 'password',
            id: 'password-input',
            dataset: { key: 'model_field', value: 'password' },
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
        // {
        //     href: '#',
        //     id: 'link-reset-password',
        //     text: 'Забыли пароль?'
        // }
    ],
};
export default signinFormConfig;
