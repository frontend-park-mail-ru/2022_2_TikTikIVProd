/**
 * Интерфейс страницы приложения для роутера
 * @category Router 
 * @typedef {Object} IRoute
 * @property {string} path - URL адрес страницы
 * @property {Function} handler - Обработчик перехода на страницу
 */
interface IRoute {
    path: string;
    handler: () => void;
}

/**
 * Роутер. Синглтон
 * @category Router
 */
class Router {
    /**
     * Инициализированные страницы
     * (приватное поле класса) 
     */
    private routes: IRoute[];
    
    /**
     * URL текущей страницы
     * (приватное поле класса) 
     */
    private current: string | null;
    
    /**
     * Обработчик неинициализированных страниц
     * (приватное поле класса) 
     */
    private defaultHandler: Function;

    constructor() {
        this.routes = [];
        this.current = null;
        this.defaultHandler = () => {};
    }

    /**
     * Установка обработчика для неизвестных страниц
    * @param  {Function} defaultHandler - Обработчик не найденных страниц
    * @return {void}
    */
    public setDefaultHandler(defaultHandler: Function) : void{
        this.defaultHandler = defaultHandler;
    }
    /**
     * Запуск роутера на заданной странице
     * @param  {string} entryPath URL стартовой страницы приложения
     * @return {void}
     */
    public start(entryPath: string): void {
        history.replaceState({ path: entryPath }, '', entryPath);
        this.current = entryPath;

        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            this.route();
        });

        // console.log('start: ', this.current, ' hist: ', history.state?.path);
        
        this.route();
    }

    /**
     * Инициализировать страницу в роутере
     * @param  {IRoute} route Страница приложения
     * @return {void}
     */
    public addPath(route: IRoute)  : void{
        this.routes.push(route);
    }

    
    /**
     * Перейти на страницу
     * @param  {string} path URL адрес страницы
     * @return void
     */
    public goToPath(path: string) : void {
        // console.log('go to path: ', path);
        
        history.pushState({ path: path }, '', path);
        this.route();
    }
    /**
     * Вызов перехода на страницу
     * (приватное поле класса)
     * @return void
     */
    private route(): void {
        const path = history.state?.path;
        // console.log('route: ', path);
        

        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            // console.log('route not found. Call default ', path );
            this.defaultHandler();
            return;
        }
        item.handler();
    }
}

const router = new Router();
export default router;