const signinViewConfig = {
    formId: 'signin-form',
    formTitle: 'Добро пожаловать!',
    inputs: [
        {
            title: 'E-mail:',
            type: 'email',
            id: 'email',
            placeholder: 'George@domain.com',
            // dataSection: { key: 'model_field', value: 'email' },
        },
        {
            title: 'Пароль:',
            type: 'password',
            id: 'password',
            placeholder: '*****',
            // dataSection: { key: 'model_field', value: 'password' },
        }
    ],
    submit: {
        id: 'signin-submit-btn',
        text: 'Войти',
    },
    links: [
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
export default signinViewConfig;
