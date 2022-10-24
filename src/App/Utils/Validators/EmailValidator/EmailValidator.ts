import {IValidationResult, VALID} from "../IValidationResult/IValidationResult.ts";

/**
 * Валидатор email адреса
 * @category Validators
 * @param  {string} email - Строка с email адресом, который нужно проверить
 * @returns {IValidationResult} Результат валидации
 */
function emailValidator(email: string): IValidationResult {
    const regexpEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ig
    const isValid = regexpEmail.test(email);
    if (isValid) {
        return VALID;
    }
    return { isValid: false, msg: `Введённый email имеет некорректный вид` };
}

export default emailValidator;