/**
 * Конфигурация формы авторизации
 * @category SigninForm
 * @constant {Object} signinViewConfig
 * @property {string} formId Идентификатор формы
 * @property {string} formId Идентификатор формы
 * @property {Array<object>} inputs Поля формы
 * @property {string} inputs.title - Заголовок поля ввода
 * @property {string} inputs.type - Тип поля
 * @property {string} inputs.id - Идентификатор поля ввода 
 * @property {string} inputs.placeholder - Подсказка поля ввода
 * @property {object} submit - Конфигуряция кнопки отправки формы
 * @property {object} submit.id - Идентификатор кнопки отправки формы
 * @property {object} submit.text - Текст кнопки отправки формы
 * @property {Array<object>} links - Ссылки внизу формы
 * @property {string} links.href - URL ссылки
 * @property {object} links.id - Идентификатор ссылки
 * @property {object} links.text - Текст ссылки
 */
const signinViewConfig = {
    formId: 'signin-form',
    formTitle: 'Добро пожаловать!',
    inputs: [
        {
            title: 'Введите E-mail:',
            type: 'email',
            id: 'email',
            placeholder: 'E-mail',
        },
        {
            title: 'Введите пароль:',
            type: 'password',
            id: 'password',
            placeholder: 'Пароль',
        }
    ],
    submit: {
        id: 'signin-submit-btn',
        text: 'Войти',
    },
    links: [
        {
            href: '/signup',
            id: 'link-signup',
            text: 'Нет аккаунта?',
        },
        // {
        //     href: '#',
        //     id: 'link-reset-password',
        //     text: 'Забыли пароль?'
        // }
    ],
};

export default signinViewConfig;