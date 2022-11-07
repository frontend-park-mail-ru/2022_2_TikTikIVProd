/**
 * Конфигурация формы регистрации
 * @category SignupForm
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
const signupViewConfig = {
    formId: 'signup-form',
    formTitle: 'Рады вас приветствовать!',
    inputs: [
        {
            title: 'Ваше имя:',
            type: 'text',
            id: 'first_name',
            placeholder: 'Георгий',
        },
        {
            title: 'Ваша фамилия:',
            type: 'text',
            id: 'last_name',
            placeholder: 'Пупкин',
        },
        {
            title: 'Придумайте псевдоним:',
            type: 'text',
            id: 'nick_name',
            placeholder: 'GeorgePupkin123',
        },
        {
            title: 'E-mail:',
            type: 'email',
            id: 'email',
            placeholder: 'George@domain.com',
        },
        {
            title: 'Пароль:',
            type: 'password',
            id: 'password',
            placeholder: '*****',
        },
        {
            title: 'Введите пароль ещё раз:',
            type: 'password',
            id: 'repeat_password',
            placeholder: '*****',
        }
    ],
    submit: {
        id: 'signup-submit-btn',
        text: 'Зарегистрироваться',
    },
    links: [
        {
            href: '/signin',
            id: 'link-signin',
            text: 'Уже есть аккаунт?',
        },
    ],
};

export default signupViewConfig;
