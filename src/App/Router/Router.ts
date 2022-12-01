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
            return;
        }
        const path = this.sanitizeUrl(rawPath);

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
            this.unknownPageHandler();
            return;
        }
    }

    public showUnknownPage(): void {
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
