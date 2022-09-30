class Header {
    private parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    render() {
        const headerElement = document.createElement('div');
        headerElement.classList.add('header');
        this.parent.appendChild(headerElement);

        const logo = document.createElement('a');
        logo.classList.add('header__logo');
        logo.innerText = "WS";
        headerElement.appendChild(logo);
    }
}

export default Header;