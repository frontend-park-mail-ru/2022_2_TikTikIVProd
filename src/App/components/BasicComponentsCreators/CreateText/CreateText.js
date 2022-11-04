export default function createText(props) {
    const elem = document.createElement('text');
    elem.textContent = props.text || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
