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
const communitySettingsConfig = {
    groups: [
        {
            inputs: [
                {
                    title: 'Название сообщества:',
                    type: 'text',
                    id: 'name',
                },
            ]
        },
        // {
        //     inputs: [
        //         {
        //             title: 'Катеория сообщества:',
        //             type: 'text',
        //             id: 'name',
        //         },
        //     ]
        // },
        {
            textareas: [
                {
                    title: 'Описание сообщества',
                    name: 'description',
                    id: 'description',
                    rows: 10,
                },
            ],
        },
    ],
};

export default communitySettingsConfig;