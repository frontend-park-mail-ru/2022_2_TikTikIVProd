interface ITextProps {
    text?: string;
}

export default function createText(props: ITextProps): HTMLElement {
    const elem = document.createElement('text');
    elem.textContent = props.text || '';
    return elem;
}