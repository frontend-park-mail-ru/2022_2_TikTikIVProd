export default function createInput(props) {
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