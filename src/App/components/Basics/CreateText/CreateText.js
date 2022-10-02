export default function createText(props) {
    const elem = document.createElement('text');
    elem.textContent = props.text || '';
    return elem;
}
