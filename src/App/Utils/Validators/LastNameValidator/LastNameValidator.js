export default function lastNameValidator(lastName) {
    const regexpLastName = /^[a-zа-я]{1,10}$/igd;
    const isValid = regexpLastName.test(lastName);
    if (isValid) {
        return { isValid: true, msg: '' };
    }
    return { isValid: false, msg: `Фамилия может состоять из русских и английских букв в одно слово` };
}
