const signupFormConfig = {
    title: 'Рады вас приветствовать!',
    fields: [
        {
            title: 'Ваше имя:',
            type: 'text',
            id: 'fist-name-input',
            placeholder: 'Георгий',
        },
        {
            title: 'Ваша фамилия:',
            type: 'text',
            id: 'last-name-input',
            placeholder: 'Пупкин',
        },
        {
            title: 'Придумайте псевдоним:',
            type: 'text',
            id: 'nickname-input',
            placeholder: 'GeorgePupkin123',
        },
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
        },
        {
            title: 'Введите пароль ещё раз:',
            type: 'password',
            id: 'repeat-password-input',
            placeholder: '*****',
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
};
export default signupFormConfig;
