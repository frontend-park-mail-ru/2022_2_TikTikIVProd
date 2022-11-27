
const communityCreationFormConfig = {
    formId: 'community-creation-form',
    formTitle: 'Создание сообщества',
    inputs: [
        {
            title: 'Название сообщества:',
            type: 'text',
            id: 'name',
            placeholder: 'Клуб любителей пива',
        },
        {
            title: 'Категория сообщества:',
            type: 'text',
            id: 'category',
            placeholder: 'Кулинария',
        },
    ],
    textareas: [
        {
            title: 'Описание сообщества',
            name: 'description',
            id: 'description',
            rows: 10,
            placeholder: 'Помогаем выбрать вам...'
        },
    ],
    submit: {
        id: 'submit-form',
        text: 'Создать',
    },
};

export default communityCreationFormConfig;