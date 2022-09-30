export function createDiv(props) {
    const elem = document.createElement('div');
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
export function createInput(props) {
    const elem = document.createElement('input');
    elem.type = props.type || '';
    elem.id = props.id || '';
    elem.placeholder = props.placeholder || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
export function createButton(props) {
    const elem = document.createElement('button');
    elem.id = props.id || '';
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
export function createLink(props) {
    const elem = document.createElement('a');
    elem.id = props.id || '';
    elem.textContent = props.text || '';
    elem.href = props.href || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
export function createImg(props) {
    const elem = document.createElement('img');
    elem.id = props.id || '';
    elem.src = props.src || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
export function createText(props) {
    const elem = document.createElement('text');
    elem.textContent = props.text || '';
    return elem;
}
HTMLElement.prototype.appendChildren = function (...nodes) {
    for (var i = 0; i < arguments.length; i++) {
        this.appendChild(arguments[i]);
    }
    return this;
};
