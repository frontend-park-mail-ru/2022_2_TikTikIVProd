export default function firstNameValidator(firstName) {
    const regexpFirstName = /^[a-zа-я]{1,10}$/igd;
    const isValid = regexpFirstName.test(firstName);
    if (isValid) {
        return { isValid: true, msg: '' };
    }
    return { isValid: false, msg: `Имя может состоять из русских и английских букв в одно слово` };
}
