/**
 * Функция тротлинга. Не позволяет вызывать целевую функцию чаще чем раз в заданное время
 * @category Utils
 * @param  {Function} callee - Целевая функция
 * @param  {number} timeout - Задержка в милисекундах
 */
function throttle(callee: Function, timeout: number = 300) {
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;

    return function perform(...args: any) {
        if (timer) {
            return;
        }

        timer = setTimeout(() => {
            callee(...args)

            clearTimeout(timer);
            timer = undefined;
        }, timeout);
    };
}

export default throttle;