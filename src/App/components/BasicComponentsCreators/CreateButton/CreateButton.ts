export interface IButtonProps {
    id?: string;
    text?: string;
    styles?: string[];
    callback?: () => void;
}

export default function createButton(props: IButtonProps): HTMLElement {
    const elem = document.createElement('button');
    elem.id = props.id || '';
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        if (props.callback !== undefined) {
            props.callback();
        }
    });
    return elem;
}