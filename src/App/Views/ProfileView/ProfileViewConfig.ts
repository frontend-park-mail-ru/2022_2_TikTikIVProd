/**
 * Конфигурация профиля пользователя
 * @category Profile
 * @constant {Object}  profileViewConfig
 * @property {Array<object>} buttons - Кнопки навигации в профиле
 * @property {object} buttons.id - id кнопки
 * @property {object} buttons.test - Текст на кнопке
 * @property {object} buttons.href - URL перехода при нажатии
 */
const profileViewConfig = {
    buttons: [
        {
            id: 'profile_btn_settings',
            text: 'Настройки профиля',
            href: '/settings'
        },
    ],
}

export default profileViewConfig;