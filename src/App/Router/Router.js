class Router {
    constructor() {
        this.routes = [];
        this.current = null;
    }
    start(entryPath) {
        history.replaceState({ path: entryPath }, '', entryPath);
        this.current = entryPath;
        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            console.log(e.state.path);
            this.route();
        });
        this.route();
    }
    addPath(route) {
        this.routes.push(route);
    }
    goToPath(path) {
        history.pushState({ path: path }, '', path);
        this.route();
    }
    route() {
        var _a;
        const path = (_a = history.state) === null || _a === void 0 ? void 0 : _a.path;
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
