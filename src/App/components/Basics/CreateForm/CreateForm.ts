interface IFormProps {
    id?: string;
    acceptCharset?: string;
    action?: string;
    autocomplete?: boolean;
    enctype?: string;
    method?: string;
    name?: string;
    novalidate?: boolean;
    target?: string;
    styles?: string[];
}

export default function createForm(props: IFormProps): HTMLFormElement {
    const elem = document.createElement('form');
    elem.acceptCharset = props.acceptCharset || '';
    elem.action = props.action || '';
    elem.autocomplete = props.autocomplete ? 'on' : 'off';
    elem.enctype = props.enctype || '';
    elem.method = props.method || '';
    elem.name = props.name || '';
    elem.noValidate = props.novalidate ? true : false;
    elem.target = props.target || '';
    elem.id = props.id || '';

    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}