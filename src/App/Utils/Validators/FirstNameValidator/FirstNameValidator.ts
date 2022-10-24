import { IValidationResult, VALID } from "../IValidationResult/IValidationResult.ts";

/**
 * Валидатор имени пользователя
 * @category Validators
 * @param  {string} firstName - Строка, которую нужно проверить
 * @returns {IValidationResult} Результат валидации
 */
function firstNameValidator(firstName: string): IValidationResult {
    const regexpFirstName = /^[a-zа-я]{1,10}$/igd;
    const isValid = regexpFirstName.test(firstName);
    if (isValid) {
        return VALID;
    }
    return { isValid: false, msg: `Имя может состоять из русских и английских букв в одно слово` };
}

export default firstNameValidator;