class Router {
    constructor() {
        this.routes = [];
        this.current = undefined;
    }
    addPath(route) {
        this.routes.push(route);
    }
    goToPath(path) {
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