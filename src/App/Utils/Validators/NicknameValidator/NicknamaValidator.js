export default function nicknameValidator(nickname) {
    const regexpNickname = /^[\w]{1,10}$/igd;
    const isValid = regexpNickname.test(nickname);
    if (isValid) {
        return { isValid: true, msg: '' };
    }
    return { isValid: false, msg: `Псевдоним может состоять из английских букв и цифр без пробелов` };
}
