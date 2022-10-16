export default function emailValidator(email) {
    const regexpEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ig;
    const isValid = regexpEmail.test(email);
    if (isValid) {
        return { isValid: true, msg: '' };
    }
    return { isValid: false, msg: `Введённый email имеет некорректный вид` };
}
