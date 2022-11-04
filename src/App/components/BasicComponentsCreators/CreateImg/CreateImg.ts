export interface IImgProps {
    id?: string;
    src?: string;
    styles?: string[];
}

export default function createImg(props: IImgProps): HTMLElement {
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