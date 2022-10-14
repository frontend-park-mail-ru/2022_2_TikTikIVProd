export default function throttle(callback: Function, timeout: number) {
    let timer: number | undefined = undefined;
    return function perform(...args: any) {
        if (timer) {
            return;
        }

        timer = setTimeout(() => {
            callback(...args);
            clearTimeout(timer);
            timer = undefined;
        }, timeout);
    }
}