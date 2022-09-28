// import './Header.css'

class Header {
    private parent: any;
    private classNames: string = "header";

    constructor(parent: any) {
        this.parent = parent;
    }

    render() {
        const headerElement = document.createElement('header');
        headerElement.classList.add('header');
        this.parent.appendChild(headerElement);
    }
}

export default Header;