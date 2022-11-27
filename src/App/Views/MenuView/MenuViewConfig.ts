import paths from "../../Router/RouterPaths";

/**
 * Конфигурация элементов меню
 * @category Menu
 * @constant {Object} 
 */
const menuConfig = {
    title: '',
    items: [
        {
            href: paths.feedPage,
            text: 'Лента',
            icon: '../src/img/feed_icon.svg',
        },
        {
            href: paths.profile,
            text: 'Профиль',
            icon: '../src/img/profile_icon.svg',
        },
        {
            href: paths.messenger,
            text: 'Сообщения',
            icon: '../src/img/messenger_icon.svg',
        },
        {
            href: paths.friends,
            text: 'Друзья',
            icon: '../src/img/friends_icon.svg',
        },
        {
            href: paths.communities,
            text: 'Сообщества',
            icon: '../src/img/groups_icon.svg',
        },
        {
            href: paths.logout,
            text: 'Выйти',
            style: 'menu__logout__link',
            icon: '../src/img/logout_icon.svg',
        },
    ],
}

export default menuConfig;