export default function createForm(props) {
    const elem = document.createElement('form');
    elem.acceptCharset = props.acceptCharset || '';
    elem.action = props.action || '';
    elem.autocomplete = props.autocomplete ? 'on' : 'off';
    elem.enctype = props.enctype || '';
    elem.method = props.method || '';
    elem.name = props.name || '';
    elem.noValidate = props.novalidate ? true : false;
    elem.target = props.target || '';
    if (props.styles !== undefined) {
        props.styles.forEach((style) => {
            elem.classList.add(style);
        });
    }
    return elem;
}
