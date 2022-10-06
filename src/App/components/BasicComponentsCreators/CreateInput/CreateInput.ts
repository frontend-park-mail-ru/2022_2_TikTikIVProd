export interface IInputProps {
    id?: string;
    type?: string;
    placeholder?: string;
    styles?: string[];
    dataset?: string;
}

export default function createInput(props: IInputProps): HTMLElement {
    const elem = document.createElement('input');
    elem.type = props.type || '';
    elem.id = props.id || '';
    elem.placeholder = props.placeholder || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    if (props.dataset !== undefined) {
        elem.setAttribute('model_field', props.dataset);
    }
    return elem;
}