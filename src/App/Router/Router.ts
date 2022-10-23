/**
 * Интерфейс страницы приложения для роутера 
 * @typedef {Object} IRoute
 * @property {string} path - URL адрес страницы
 * @property {Function} handler - Обработчик перехода на страницу
 */
interface IRoute {
    path: string;
    handler: () => void;
}

/**
 * @class Роутер. Синглтон
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

    constructor() {
        this.routes = [];
        this.current = null;
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

        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            return;
        }
        item.handler();
    }
}

const router = new Router();
export default router;