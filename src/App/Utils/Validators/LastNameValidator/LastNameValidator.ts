import { IValidationResult, VALID } from "../IValidationResult/IValidationResult.ts";

/**
 * Валидатор фамилии пользователя
 * @category Validators
 * @param  {string} lastName - Строка, которую нужно проверить
 * @returns {IValidationResult} Результат валидации
 */
function lastNameValidator(lastName: string): IValidationResult {
    const regexpLastName = /^[a-zа-я]{1,10}$/igd;
    const isValid = regexpLastName.test(lastName);
    if (isValid) {
        return VALID;
    }
    return { isValid: false, msg: `Фамилия может состоять из русских и английских букв в одно слово` };
}

export default lastNameValidator; 