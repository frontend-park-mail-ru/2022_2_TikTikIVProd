import inputValidatorTypes from "./InputValidatorTypes"

/**
 * Результат валидации
 * @category Validators
 * @typedef {object} IValidationResult
 * @property {boolean} isValid - Является ли переданное значение корректным
 * @property {string} msg - Сообщение об ошибке
 */
export interface IValidationResult { 
    isValid : boolean;
    msg : string;
};

/**
 * Константа результата успешной вализации.
 * @category Validators
 * @constant {IValidationResult} VALID
 */
export const VALID : IValidationResult = {isValid : true, msg: ''};

/**
 * Константа результата валидации неизестного поля.
 * @category Validators
 * @constant {IValidationResult} UNKNOWN
 */
export const UNKNOWN : IValidationResult = {isValid : false, msg: 'Неизвестный тип поля'};

/**
 * Валидатор значения введённго в поле ввода
 * @category Validators
 * @param  {string} type - Тип данного, содержащегося в поле
 * @param  {string} value - Значение
 * @return {IValidationResult}
 */
function validateInput(type: string, value: string) : IValidationResult{
    const validator = inputValidatorTypes[type as keyof typeof inputValidatorTypes];
    if(!validator){
        return UNKNOWN;
    }
    validator.regExp.lastIndex = 0;
    const isValid = validator.regExp.test(value);
    if(isValid){
        return VALID;
    }
    return {isValid: false, msg: validator.msg};
}

export default validateInput;