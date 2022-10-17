interface IRoute {
    path: string;
    handler: () => void;
}

class Router {
    private routes: IRoute[];
    private current: string | null;

    constructor() {
        this.routes = [];
        this.current = null;
    }

    public start(entryPath: string): void {
        history.replaceState({ path: entryPath }, '', entryPath);
        this.current = entryPath;

        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            console.log(e.state.path);
            this.route();
        });

        this.route();
    }

    public addPath(route: IRoute) {
        this.routes.push(route);
    }

    public goToPath(path: string) {
        history.pushState({ path: path }, '', path);
        this.route();
    }

    private route(): void {
        const path = history.state?.path;
        console.log('location ', location);


        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            return;
        }
        item.handler();
    }
}

const router = new Router();
export default router;