export interface IButtonProps {
    id?: string;
    text?: string;
    styles?: string[];
    event?: {
        eventType: string,
        callback: (e: Event) => void;
    }
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
    if (props.event !== undefined) {
        elem.addEventListener(props.event.eventType, (e) => {
            // e.preventDefault();
            props.event?.callback(e);
        });
    }
    return elem;
}