import inputValidatorTypes from "./InputValidatorTypes"

/**
 * Результат валидации
 * @category Validators
 * @typedef {object} IValidationResult
 * @property {boolean} isValid - Является ли переданное значение корректным
 * @property {string} msg - Сообщение об ошибке
 */
export interface IValidationResult {
    isValid: boolean;
    msg: string;
};

/**
 * Константа результата несовпадения значения с контрольным при валидации
 * @category Validators
 * @constant {IValidationResult} DIFFERENT
 */
 export const DIFFERENT: IValidationResult = { isValid: false, msg: '' };

/**
 * Константа результата успешной валидации.
 * @category Validators
 * @constant {IValidationResult} VALID
 */
export const VALID: IValidationResult = { isValid: true, msg: '' };

/**
 * Константа результата валидации неизестного поля.
 * @category Validators
 * @constant {IValidationResult} UNKNOWN
 */
export const UNKNOWN: IValidationResult = { isValid: false, msg: 'Неизвестный тип поля' };

/**
 * Валидатор значения введённго в поле ввода
 * @category Validators
 * @param  {string} type - Тип данного, содержащегося в поле
 * @param  {string} value - Проверяемое значение
 * @param {?string} reference - Целевое значение для сравнения
 * @return {IValidationResult}
 */
function validateInput(type: string, value: string, reference?: string): IValidationResult {
    const validator = inputValidatorTypes[type as keyof typeof inputValidatorTypes];
    if (!validator) {
        return UNKNOWN;
    }
    if (reference && value !== reference) {
        return { isValid: false, msg: validator.msg };
    }

    validator.regExp.lastIndex = 0;
    const isValid = validator.regExp.test(value);
    if (!isValid) {
        return { isValid: false, msg: validator.msg };
    }

    return VALID;
}

export default validateInput;