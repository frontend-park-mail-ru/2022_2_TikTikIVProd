// import './Header.css'
class Header {
    constructor(parent) {
        this.classNames = "header";
        this.parent = parent;
    }
    render() {
        const headerElement = document.createElement('header');
        headerElement.classList.add('header');
        
        this.parent.appendChild(headerElement);
    }
}
export default Header;
