
/**
 * Класс работы с событиями приложения. Синглтон
 * @class
 * @category EventDispatcher
 */
class EventDispatcher {
    /**
     * Хранилище эвентов
     * (Приватное поле класса)
     * @type {Map<string, Array<Function>>}
     */
    private events: Map<string, Array<Function>>;
    
    constructor() {
        this.events = new Map;
    }

    /**
     * Функция подписки на событие
     * @param  {string} eventName - Имя события
     * @param  {Function} callback - Действие, которое нужно выполнить при срабатывании события
     * @return {void}
     */
    public subscribe(eventName: string, callback: Function): void {
        const callbackList = this.events.get(eventName);
        if (!callbackList) {
            this.events.set(eventName, [callback]);
            return;
        }
        callbackList.push(callback);        
    }

    /**
     * Функция отписки от события
     * @param  {string} eventName - Имя события
     * @param  {Function} callback - Действие, которое нужно было выполнить при срабатывании события
     * @return {void}
     */
    public unsubscribe(eventName: string, callback: Function): void {
        const callbackList = this.events.get(eventName);
        if (!callbackList) {
            return;
        }
        this.events.set(
            eventName,
            callbackList
                .filter((func) => {
                    return func !== callback;
                })
        );
    }

    /**
     * Функция вызова события
     * @param  {string} eventName - Имя события
     * @param  {?any} data - Данные, которые нужно передать в функцию-обработчик
     * @return {void}
     */
    public emit(eventName: string, data?: any): void {
        this.events.get(eventName)?.forEach(callback => {
            callback(data);
        });
    }
}

export default new EventDispatcher();