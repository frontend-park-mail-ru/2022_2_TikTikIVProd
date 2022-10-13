// import FormInput from "../../Components/Form/FormValidator.js";

// interface IValidationResult {
//     isValid: boolean;
//     msgError: string;
// }

// export default interface SigninFormInput extends FormInput { }

// export default class SigninFormInput extends FormInput {
//     constructor() { }

//     validate(dataType: string): boolean {
//         let result: IValidationResult = { isValid: true, msgError: '' };
//         switch (dataType) {
//             case 'email': {
//                 result = emailValidator(this.value);
//                 break;
//             }
//         }

//         if (result.isValid) {
//             this.hideError();
//         } else {
//             this.showError(result.msgError);
//         }

//         return result.isValid;
//     }
// }

// function firstNameValidator(firstName: string): IValidationResult {
//     const regexpFirstName = /^[a-zа-я]{1,10}$/igd;
//     const isValid = regexpFirstName.test(firstName);
//     if (isValid) {
//         return { isValid: true, msgError: '' }
//     }
//     return { isValid: false, msgError: `Имя может состоять из русских и английских букв в одно слово` };
// }

// function lastNameValidator(lastName: string): IValidationResult {
//     const regexpLastName = /^[a-zа-я]{1,10}$/igd;
//     const isValid = regexpLastName.test(lastName);
//     if (isValid) {
//         return { isValid: true, msgError: '' }
//     }
//     return { isValid: false, msgError: `Фамилия может состоять из русских и английских букв в одно слово` };
// }

// function nicknameValidator(nickname: string): IValidationResult {
//     const regexpNickname = /^[\w]{1,10}$/igd;
//     const isValid = regexpNickname.test(nickname);
//     if (isValid) {
//         return { isValid: true, msgError: '' }
//     }
//     return { isValid: false, msgError: `Псевдоним может состоять из английских букв и цифр без пробелов` };
// }

// function passwordValidator(password: string): IValidationResult {
//     const regexpPassword = /^(\S*){8,}$/igd;
//     const isValid = regexpPassword.test(password);
//     if (isValid) {
//         return { isValid: true, msgError: '' }
//     }
//     return { isValid: false, msgError: `Минимальная длина пароля 8 символов без пробелов` };
// }


// function emailValidator(email: string): IValidationResult {
//     const regexpEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ig
//     const isValid = regexpEmail.test(email);
//     if (isValid) {
//         return { isValid: true, msgError: '' }
//     }
//     return { isValid: false, msgError: `Введённый email имеет некорректный вид` };
// }