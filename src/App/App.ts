import compileBase from "./Components/Base/Base";

export default class App {
    constructor() { }
    public run() {
        this.initPage();
    }

    private initPage() {
        const baseTemplate = compileBase();
        document.body.innerHTML = baseTemplate({});
    }
}