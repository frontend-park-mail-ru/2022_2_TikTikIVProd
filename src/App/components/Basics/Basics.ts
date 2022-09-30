interface IDivProps {
    id?: string;
    text?: string;
    styles?: string[];
}

export function createDiv(props: IDivProps): HTMLElement {
    const elem = document.createElement('div');
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}

interface IInputProps {
    id?: string;
    type?: string;
    placeholder?: string;
    styles?: string[];
}

export function createInput(props: IInputProps): HTMLElement {
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

interface IButtonProps {
    id?: string;
    text?: string;
    styles?: string[];
}

export function createButton(props: IButtonProps): HTMLElement {
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

interface ILinkProps {
    id?: string;
    text?: string;
    href?: string;
    styles?: string[];
}

export function createLink(props: ILinkProps): HTMLElement {
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

interface IImgProps {
    id?: string;
    src?: string;
    styles?: string[];
}

export function createImg(props: IImgProps): HTMLElement {
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

interface ITextProps {
    text?: string;
}

export function createText(props: ITextProps): HTMLElement {
    const elem = document.createElement('text');
    elem.textContent = props.text || '';
    return elem;
}

declare global {
    interface HTMLElement {
        appendChildren(...nodes: (string | Node)[]): HTMLElement
    }
}

HTMLElement.prototype.appendChildren = function (...nodes: (string | Node)[]): HTMLElement {
    for (var i = 0; i < arguments.length; i++) {
        this.appendChild(arguments[i]);
    }
    return this;
}
