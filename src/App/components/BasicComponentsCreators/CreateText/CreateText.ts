export interface ITextProps {
    text?: string;
    styles?: string[];
}

export default function createText(props: ITextProps): HTMLElement {
    const elem = document.createElement('text');
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}