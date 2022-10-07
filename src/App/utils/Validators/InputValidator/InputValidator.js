export function validateInput(dataType, value) {
    if (dataType !== undefined && value !== undefined) {
        switch (dataType) {
            case 'first_name': {
                return firstNameValidator(value);
            }
            case 'last_name': {
                return lastNameValidator(value);
            }
            case 'nick_name': {
                return nicknameValidator(value);
            }
            case 'email': {
                return emailValidator(value);
            }
            case 'password': {
                return passwordValidator(value);
            }
            case 'repeat_password': {
                return { isValid: true, msgError: '' };
            }
            default: {
            }
        }
    }
    return { isValid: true, msgError: 'ОШибка!!!!!' };
}
function firstNameValidator(firstName) {
    const regexpFirstName = /^[a-zа-я]{1,10}$/igd;
    const isValid = regexpFirstName.test(firstName);
    if (isValid) {
        return { isValid: true, msgError: '' };
    }
    return { isValid: false, msgError: `Имя может состоять из русских и английских букв в одно слово` };
}
function lastNameValidator(lastName) {
    const regexpLastName = /^[a-zа-я]{1,10}$/igd;
    const isValid = regexpLastName.test(lastName);
    if (isValid) {
        return { isValid: true, msgError: '' };
    }
    return { isValid: false, msgError: `Фамилия может состоять из русских и английских букв в одно слово` };
}
function nicknameValidator(nickname) {
    const regexpNickname = /^[\w]{1,10}$/igd;
    const isValid = regexpNickname.test(nickname);
    if (isValid) {
        return { isValid: true, msgError: '' };
    }
    return { isValid: false, msgError: `Псевдоним может состоять английских букв и цифр в одно слово` };
}
function passwordValidator(password) {
    const regexpPassword = /^([\w]{8,30})$/igd;
    const isValid = regexpPassword.test(password);
    if (isValid) {
        return { isValid: true, msgError: '' };
    }
    return { isValid: false, msgError: `Пароль должен состоять из букв и цифр и иметь длину от 8 до 30 символов` };
}
function emailValidator(email) {
    const regexpEmail = /^([\w]*)@([a-z]*).([a-z]*)$/igd;
    const isValid = regexpEmail.test(email);
    if (isValid) {
        return { isValid: true, msgError: '' };
    }
    return { isValid: false, msgError: `Неверный формат "${email}". Пример: my-email@domain.ru` };
}
