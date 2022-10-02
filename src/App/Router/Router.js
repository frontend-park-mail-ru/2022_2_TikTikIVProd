class Router {
    constructor() {
        this.routes = [];
        this.current = undefined;
    }
    addPath(route) {
        this.routes.push(route);
    }
    goToPath(path, clearLastView) {
        const item = this.routes.find((item) => item.path == path);
        if (item === undefined) {
            console.log('No path');
            return;
        }
        if (this.current !== undefined && clearLastView) {
            this.current.view.unmount();
        }
        // window.history.pushState(null, 'null', path);
        this.current = item;
        item.view.render();
    }
}
const router = new Router();
export default router;
