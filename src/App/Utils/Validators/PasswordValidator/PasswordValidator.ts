export default function passwordValidator(password: string): { isValid: boolean, msg: string } {
    const regexpPassword = /^(\S*){8,}$/igd;
    const isValid = regexpPassword.test(password);
    if (isValid) {
        return { isValid: true, msg: '' }
    }
    return { isValid: false, msg: `Минимальная длина пароля 8 символов без пробелов` };
}