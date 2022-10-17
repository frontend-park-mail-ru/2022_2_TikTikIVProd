import headerButtonTemplate from "../../Components/HeaderButton/HeaderButton.js";
import headerProfileTemplate from "../../Components/HeaderProfile/HeaderProfile.js";

const _headerItems = {
    'signinButton': {
        data: {
            href: '/signin',
            text: 'Войти',
        },
        render: headerButtonTemplate,
    },
    'signupButton': {
        data: {
            href: '/signup',
            text: 'Зарегистрироваться',
        },
        render: headerButtonTemplate,
    },
    'profile': {
        data: {
            href_profile: '/profile',
            href_settings: '/settings',
            // user_avatar: '../src/img/test_avatar.jpg',
            // user_name: 'Test User',
            settings_icon: '../src/img/settings_icon.svg',
        },
        render: headerProfileTemplate,
    },
};

const headerItems = new Map(Object.entries(_headerItems));
export default headerItems
