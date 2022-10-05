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

    public goToPath(path: string, clearLastView: boolean) {
        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            console.log('No path');
            return;
        }


        item.handler();
    }


}

const router = new Router();
export default router;