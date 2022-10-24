import { IValidationResult, VALID } from "../IValidationResult/IValidationResult.ts";

/**
 * Валидатор пароля
 * @category Validators
 * @param  {string} email - Строка, которую нужно проверить
 * @returns {IValidationResult} Результат валидации
 */
function passwordValidator(password: string):  IValidationResult {
    const regexpPassword = /^(\S*){8,}$/igd;
    const isValid = regexpPassword.test(password);
    if (isValid) {
        return VALID;
    }
    return { isValid: false, msg: `Минимальная длина пароля 8 символов без пробелов` };
}

export default passwordValidator;