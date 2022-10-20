const config = {
    menu: {
        feed: {
            href: '/feed',
            name: 'Лента',
            style: '',
            id: 'menu__item_0',
        },
        profile: {
            href: '/profile',
            name: 'Профиль',//safe('Профиль'),
            style: '',
            id: 'menu__item_1',

        },
        logout: {
            href: '/logout',
            name: 'Выйти',//safe('Профиль'),
            style: 'menu__logout__link',
            id: 'menu__item_2',

        },
    },
    APIUrl: 'http://127.0.0.1:8080'
};

export default config;