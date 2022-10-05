export default function createLink(props) {
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
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        if (props.event !== undefined) {
            props.event.callback();
        }
    });
    return elem;
}
