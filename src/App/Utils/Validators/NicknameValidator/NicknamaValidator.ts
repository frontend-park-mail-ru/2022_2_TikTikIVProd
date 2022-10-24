import { IValidationResult, VALID } from "../IValidationResult/IValidationResult.ts";
/**
 * Валидатор псевдомима пользователя
 * @category Validators
 * @param  {string} nickname - Строка, которую нужно проверить
 * @returns {IValidationResult} Результат валидации
 */
function nicknameValidator(nickname: string): IValidationResult {
    const regexpNickname = /^[\w]{1,10}$/igd;
    const isValid = regexpNickname.test(nickname);
    if (isValid) {
        return VALID;
    }
    return { isValid: false, msg: `Псевдоним может состоять из английских букв и цифр без пробелов` };
}

export default nicknameValidator ;

