import renderFeed from "../components/Feed/Feed.js";
import renderProfile from "../components/Profile/Profile.js";
import renderSigninView from "../components/SigninView/SigninView.js";
import renderSignupView from "../components/SignupView/SignupView.js";
const config = {
    menu: {
        main: {
            href: '/main',
            name: 'Лента',
            render: renderFeed,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: renderSigninView,
        },
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: renderSignupView,
        },
        profile: {
            href: '/profile',
            name: 'Профиль',
            render: renderProfile,
        },
    },
};
export default config;
