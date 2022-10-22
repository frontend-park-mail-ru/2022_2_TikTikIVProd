/**
 * Результат валидации
 * @typedef {object} ValidationResult
 * @property {boolean} isValid - Является ли переданное значение корректным
 * @property {string} msg - Сообщение об ошибке
 */
/**
 * Валидатор email адреса
 * @param  {string} email - Строка с email адресом, который нужно проверить
 * @returns {ValidationResult} Результат валидации
 */
const  emailValidator = function(email: string): { isValid: boolean, msg: string } {
    const regexpEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ig
    const isValid = regexpEmail.test(email);
    if (isValid) {
        return { isValid: true, msg: '' }
    }
    return { isValid: false, msg: `Введённый email имеет некорректный вид` };
}
export default emailValidator