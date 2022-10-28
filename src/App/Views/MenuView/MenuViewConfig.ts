/**
 * Конфигурация элементов меню
 * @category Menu
 * @constant {Object} 
 */
const menuConfig = {
    title: '',
    items: [
        {
            href: '/feed',
            text: 'Лента',
        },
        {
            href: '/profile',
            text: 'Профиль',
        },
        {
            href: '/logout',
            text: 'Выйти',
            style: 'menu__logout__link',
        },
    ],
}

export default menuConfig;