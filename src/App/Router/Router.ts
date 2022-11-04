interface IRoute {
    path: string;
    handler: () => void;
}

class Router {
    private routes: IRoute[];

    private current: IRoute | undefined;

    constructor() {
        this.routes = [];
        this.current = undefined;
    }

    public addPath(route: IRoute) {
        this.routes.push(route);
    }

    public goToPath(path: string) {
        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            return;
        }

        item.handler();
    }
}

const router = new Router();
export default router;