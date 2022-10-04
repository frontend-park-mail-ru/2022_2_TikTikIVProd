export default function createDiv(props) {
    const elem = document.createElement('div');
    if (props.id !== undefined) {
        elem.id = props.id;
    }
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
