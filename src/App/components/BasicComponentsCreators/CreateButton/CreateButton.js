export default function createButton(props) {
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
            var _a;
            // e.preventDefault();
            (_a = props.event) === null || _a === void 0 ? void 0 : _a.callback(e);
        });
    }
    return elem;
}
