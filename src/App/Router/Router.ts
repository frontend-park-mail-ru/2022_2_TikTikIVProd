import IComponent from "../components/IComponent/IComponent";


interface IRoute {
    path: string;
    view: IComponent;
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
            console.log('No path');
            return;
        }

        if (this.current !== undefined) {
            this.current.view.unmount();
        }

        this.current = item;
        item.view.render();
    }


}

const router = new Router();
export default router;