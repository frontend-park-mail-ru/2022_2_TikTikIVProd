import renderFeed from "../components/Feed/Feed.js";
import renderProfile from "../components/Profile/Profile.js";
const config = {
    menu: {
        feed: {
            href: '/feed',
            name: 'Лента',
            render: renderFeed,
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
            render: renderProfile,
        },
    },
};
export default config;
