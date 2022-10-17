// export default function throttle(callback: Function, timeout: number) {
//     let timer: number | undefined = undefined;
//     return function perform(...args: any) {
//         if (timer) {
//             return;
//         }
//         timer = setTimeout(() => {
//             callback(...args);
//             clearTimeout(timer);
//             timer = undefined;
//         }, timeout);
//     }
// }
// const throttle = (fn: Function, wait: number = 300) => {
//     let inThrottle: boolean,
//         lastFn: ReturnType<typeof setTimeout>,
//         lastTime: number;
//     return function (this: any) {
//         const context = this,
//             args = arguments;
//         if (!inThrottle) {
//             fn.apply(context, args);
//             lastTime = Date.now();
//             inThrottle = true;
//         } else {
//             clearTimeout(lastFn);
//             lastFn = setTimeout(() => {
//                 if (Date.now() - lastTime >= wait) {
//                     fn.apply(context, args);
//                     lastTime = Date.now();
//                 }
//             }, Math.max(wait - (Date.now() - lastTime), 0));
//         }
//     };
// };
function throttle(callee, timeout = 300) {
    let timer = undefined;
    return function perform(...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            callee(...args);
            clearTimeout(timer);
            timer = undefined;
        }, timeout);
    };
}
export default throttle;
