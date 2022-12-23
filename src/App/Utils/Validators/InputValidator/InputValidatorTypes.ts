/**
 * Конфигурация типов данных в поле input
 * @category Validators
 * @constant {Object}
 * @property {Object} input_type - Тип валидируемого поля
 * @property {RegExp} input_type.regExp - Регулярное выражение для проверки значения
 * @property {string} input_type.msg - Сообщение об ошибке, в случае несоответствия
 */
const inputValidatorTypes = {
    'email': {
        regExp: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ig,
        msg: 'Введённый email имеет некорректный вид',
    },
    'password': {
        regExp: /^\S{8,}$/ig,
        msg: 'Минимальная длина пароля 8 символов',
    },
    'repeat_password': {
        regExp: /^\S{8,}$/ig,
        msg: 'Пароли должны совпадать',
    },
    'first_name': {
        regExp: /^([a-z]{1,10}|[а-я]{1,10})$/igd,
        msg: 'Имя может состоять из русских или английских букв без пробелов',
    },
    'last_name': {
        regExp: /^([a-z]{1,10}|[а-я]{1,10})$/igd,
        msg: 'Фамилия может состоять из русских или английских букв без пробелов',
    },
    'nick_name': {
        regExp: /^[\w]{1,10}$/igd,
        msg: 'Псевдоним может состоять из английских букв и цифр без пробелов',
    },
    'description': {
        regExp: /^[\S ]{5,}$/ig,
        msg: 'Описание должно содержать минимум 5 символов',
    },
    'category': {
        regExp: /^[\S ]{5,}$/ig,
        msg: 'Категория должна содержать минимум 5 символов',
    },
    'name': {
        regExp: /^[\S ]{5,}$/ig,
        msg: 'Название сообщества должно иметь длину не менее 5 символов',
    },
}

export default inputValidatorTypes;