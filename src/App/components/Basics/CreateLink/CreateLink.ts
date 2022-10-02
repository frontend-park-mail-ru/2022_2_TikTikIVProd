interface ILinkProps {
    id?: string;
    text?: string;
    href?: string;
    styles?: string[];
}

export default function createLink(props: ILinkProps): HTMLElement {
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