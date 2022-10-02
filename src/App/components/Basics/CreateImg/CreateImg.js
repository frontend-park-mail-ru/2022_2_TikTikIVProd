export default function createImg(props) {
    const elem = document.createElement('img');
    elem.id = props.id || '';
    elem.src = props.src || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
