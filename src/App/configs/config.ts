import renderFeed from "../components/Feed/Feed.js";
import renderProfile from "../components/Profile/Profile.js";

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
            name: 'Профиль',//safe('Профиль'),
            style: '',
            id: 'menu__item_1',

            // render: renderProfile,
        },
        logout: {
            href: '/logout',
            name: 'Выйти',//safe('Профиль'),
            // render: renderProfile,
            style: 'menu__logout__link',
            id: 'menu__item_2',

        },
    },
    APIUrl: 'http://89.208.197.127:8080'
};

export default config;