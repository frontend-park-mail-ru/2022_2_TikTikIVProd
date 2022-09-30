class Header {
    private parent: any;

    constructor(parent: any) {
        this.parent = parent;
    }

    render() {
        const headerElement = document.createElement('div');
        headerElement.classList.add('header');
        this.parent.appendChild(headerElement);

        const logo = document.createElement('a');
        logo.classList.add('logo');
        logo.innerText = "WS";
        headerElement.appendChild(logo);
    }
}

export default Header;