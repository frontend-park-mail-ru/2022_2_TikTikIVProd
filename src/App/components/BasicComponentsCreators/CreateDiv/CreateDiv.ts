export interface IDivProps {
    id?: string;
    text?: string;
    styles?: string[];
}

export default function createDiv(props: IDivProps): HTMLElement {
    const elem = document.createElement('div');
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}