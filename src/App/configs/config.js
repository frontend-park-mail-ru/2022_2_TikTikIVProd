const config = {
    menu: {
        feed: {
            href: '/feed',
            name: 'Лента',
            style: '',
            id: 'menu__item_0',
            // render: renderFeed,
        },
        // login: {
        //     href: '/login',
        //     name: 'Авторизация',
        //     render: renderSigninView,
        // },
        // signup: {
        //     href: '/signup',
        //     name: 'Регистрация',
        //     render: renderSignupView,
        // },
        profile: {
            href: '/profile',
            name: 'Профиль',
            style: '',
            id: 'menu__item_1',
            // render: renderProfile,
        },
        logout: {
            href: '/logout',
            name: 'Выйти',
            // render: renderProfile,
            style: 'menu__logout__link',
            id: 'menu__item_2',
        },
    },
};
export default config;
