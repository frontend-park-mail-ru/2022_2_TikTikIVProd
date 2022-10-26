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
    'first_name': {
        regExp: /^[a-zа-я]{1,10}$/igd,
        msg: 'Имя может состоять из русских и английских букв без пробелов',
    },
    'last_name': {
        regExp: /^[a-zа-я]{1,10}$/igd,
        msg: 'Фамилия может состоять из русских и английских букв без пробелов',
    },
    'nick_name': {
        regExp: /^[\w]{1,10}$/igd,
        msg: 'Псевдоним может состоять из английских букв и цифр без пробелов',
    },
}

export default inputValidatorTypes;