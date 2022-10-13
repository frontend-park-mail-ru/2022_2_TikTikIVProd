const signupViewConfig = {
    formId: 'signup-form',
    formTitle: 'Рады вас приветствовать!',
    inputs: [
        {
            title: 'Ваше имя:',
            type: 'text',
            id: 'first_name',
            placeholder: 'Георгий',
        },
        {
            title: 'Ваша фамилия:',
            type: 'text',
            id: 'last_name',
            placeholder: 'Пупкин',
        },
        {
            title: 'Придумайте псевдоним:',
            type: 'text',
            id: 'nick_name',
            placeholder: 'GeorgePupkin123',
        },
        {
            title: 'E-mail:',
            type: 'email',
            id: 'email',
            placeholder: 'George@domain.com',
        },
        {
            title: 'Пароль:',
            type: 'password',
            id: 'password',
            placeholder: '*****',
        },
        {
            title: 'Введите пароль ещё раз:',
            type: 'password',
            id: 'repeat_password',
            placeholder: '*****',
        }
    ],
    submit: {
        id: 'signup-submit-btn',
        text: 'Зарегистрироваться',
    },
    links: [
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

export default signupViewConfig;