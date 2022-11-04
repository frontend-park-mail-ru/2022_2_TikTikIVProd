export interface ILinkProps {
    id?: string;
    text?: string;
    href?: string;
    styles?: string[];
    event?: {
        eventType: string;
        callback: (e: Event) => void;
    }
}

export default function createLink(props: ILinkProps): HTMLElement {
    const elem = document.createElement('a');
    elem.id = props.id || '';
    elem.textContent = props.text || '';
    elem.href = props.href || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            if (style !== '') {
                elem.classList.add(style);
            }
        });
    }

    if (props.event !== undefined) {
        elem.addEventListener(props.event.eventType, (e) => {
            // e.preventDefault();
            props.event?.callback(e);
        });
    }

    return elem;
}