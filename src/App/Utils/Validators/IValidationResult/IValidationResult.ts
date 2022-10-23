/**
 * Результат валидации
 * @typedef {object} IValidationResult
 * @property {boolean} isValid - Является ли переданное значение корректным
 * @property {string} msg - Сообщение об ошибке
 */

export interface IValidationResult { 
    isValid : boolean;
    msg : string;
};

export const VALID : IValidationResult = {isValid : true, msg: ''};