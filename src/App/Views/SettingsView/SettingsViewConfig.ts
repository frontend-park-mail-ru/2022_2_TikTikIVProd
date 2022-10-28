const settingsViewConfig = {
    groups: [
        {
            inputs: [
                {
                    title: 'E-mail:',
                    type: 'email',
                    id: 'email',
                },
            ]
        },
        {
            inputs: [
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
                },
            ],
        },
        {
            inputs: [
                {
                    title: 'Ваше имя:',
                    type: 'text',
                    id: 'first_name',
                },
                {
                    title: 'Ваша фамилия:',
                    type: 'text',
                    id: 'last_name',
                },
                {
                    title: 'Придумайте псевдоним:',
                    type: 'text',
                    id: 'nick_name',
                },
            ],
        },
    ],
};

export default settingsViewConfig;