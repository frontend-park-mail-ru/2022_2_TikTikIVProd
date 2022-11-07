/**
 * Функция проверки приближения к концу скролла
 * @category Scrollbar
 * @param  {HTMLElement} scrolledElement - Элемент, на котором прокрутка
 * @param  {number=1} ratio - Параметр, регулирующий срабатывание проверки.
 * @return {boolean}
 */
export function checkScrollEnd(scrolledElement: HTMLElement, ratio: number = 1): boolean {
    return scrolledElement.scrollHeight - scrolledElement.scrollTop - scrolledElement.clientHeight < ratio * scrolledElement.clientHeight;
}

/**
 * Функция проверки приближения к началу скролла
 * @category Scrollbar
 * @param  {HTMLElement} scrolledElement - Элемент, на котором прокрутка
 * @param  {number=1} ratio - Параметр, регулирующий срабатывание проверки.
 * @return {boolean}
 */
export function checkScrollTop(scrolledElement: HTMLElement, ratio: number = 1): boolean {
    return scrolledElement.scrollTop < ratio * scrolledElement.clientHeight;
}