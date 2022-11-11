/**
 * Конфигурация натсроек пользователя
 * @category Settings
 * @constant {Object}  settingsViewConfig
 * @property {Array<object>} groups - Группы полей
 * @property {Array<object>} groups.inputs - Поля ввода
 * @property {string} groups.title - Заголовок поля ввода
 * @property {string} groups.type - Тип
 * @property {string} groups.id - Идентификатор поля ввода поля ввода
 */
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
                    title: 'Подтверждение пароля:',
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
                    title: 'Псевдоним:',
                    type: 'text',
                    id: 'nick_name',
                },
            ],
        },
    ],
};

export default settingsViewConfig;