interface IRoute {
    rule: RegExp;
    handler: Function;
}

class Router {
    private routes: IRoute[];
    private unknownPageHandler: Function;
    constructor() {
        this.routes = [];
        this.unknownPageHandler = () => { };
    }

    public start(entryPath: string): void {
        history.replaceState({ path: entryPath }, '', entryPath);

        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            this.route();
        });

        this.route();
    }

    public goToPath(path: string): void {

        history.pushState({ path: path }, '', path);
        this.route();
    }

    private route(): void {
        const rawPath = history.state?.path;
        
        if (!rawPath) {
            // console.log('No path');
            return;
        }
        const path = this.sanitizeUrl(rawPath);
        // // console.log(' T2 ', path);

        // TODO break when found
        const found = this.routes.find(route => {
            const match = path.match(route.rule);
            if (!match) {
                return false;
            }
            match.shift();
            route.handler(match);
            return true;
        });

        if (!found) {
            // // console.log('route() err indefined url: ', rawPath);
            this.unknownPageHandler();
            return;
        }
    }

    public showUnknownPage() : void {
        this.unknownPageHandler();
    }

    public setUnknownPageHandler(handler: Function) {
        this.unknownPageHandler = handler;
    }

    public addRule(rule: string, handler: Function) {
        this.routes.push({
            rule: this.parseRule(rule),
            handler: handler,
        })
    }

    private parseRule(rule: string): RegExp {
        let uri = this.sanitizeUrl(rule)
            .replace(/{\:number}/g, '(\\d+)')
            .replace(/{\:word}/g, '(\\w+)')
            .replace(/{\:\w+}/g, '(\\w+)');

        return new RegExp(`^${uri}$`, 'i');
    }

    private sanitizeUrl(rule: string): string {
        return rule.replace(/\/$/, '').replace(/^\//, '');
    }
}

const router = new Router();
export default router;

// /**
//  * Интерфейс страницы приложения для роутера
//  * @category Router
//  * @typedef {Object} IRoute
//  * @property {string} path - URL адрес страницы
//  * @property {Function} handler - Обработчик перехода на страницу
//  */
// interface IRoute {
//     path: string;
//     handler: () => void;
// }

// /**
//  * Роутер. Синглтон
//  * @category Router
//  */
// class Router {
//     /**
//      * Инициализированные страницы
//      * (приватное поле класса)
//      */
//     private routes: IRoute[];

//     /**
//      * URL текущей страницы
//      * (приватное поле класса)
//      */
//     private current: string | null;

//     /**
//      * Обработчик неинициализированных страниц
//      * (приватное поле класса)
//      */
//     private defaultHandler: Function;

//     constructor() {
//         this.routes = [];
//         this.current = null;
//         this.defaultHandler = () => {};
//     }

//     /**
//      * Установка обработчика для неизвестных страниц
//     * @param  {Function} defaultHandler - Обработчик не найденных страниц
//     * @return {void}
//     */
//     public setDefaultHandler(defaultHandler: Function) : void{
//         this.defaultHandler = defaultHandler;
//     }
//     /**
//      * Запуск роутера на заданной странице
//      * @param  {string} entryPath URL стартовой страницы приложения
//      * @return {void}
//      */
//     public start(entryPath: string): void {
//         history.replaceState({ path: entryPath }, '', entryPath);
//         this.current = entryPath;

//         window.addEventListener('popstate', (e) => {
//             e.preventDefault();
//             this.route();
//         });

//         // // console.log('start: ', this.current, ' hist: ',
//         history.state?.path);

//         this.route();
//     }

//     /**
//      * Инициализировать страницу в роутере
//      * @param  {IRoute} route Страница приложения
//      * @return {void}
//      */
//     public addPath(route: IRoute)  : void{
//         this.routes.push(route);
//     }


//     /**
//      * Перейти на страницу
//      * @param  {string} path URL адрес страницы
//      * @return void
//      */
//     public goToPath(path: string) : void {
//         // // console.log('go to path: ', path);

//         history.pushState({ path: path }, '', path);
//         this.route();
//     }
//     /**
//      * Вызов перехода на страницу
//      * (приватное поле класса)
//      * @return void
//      */
//     private route(): void {
//         const path = history.state?.path;
//         // // console.log('route: ', path);


//         const item = this.routes.find((item) => item.path == path);
//         if (item === undefined) {
//             // // console.log('route not found. Call default ', path );
//             this.defaultHandler();
//             return;
//         }
//         item.handler();
//     }
// }

// const router = new Router();
// export default router;