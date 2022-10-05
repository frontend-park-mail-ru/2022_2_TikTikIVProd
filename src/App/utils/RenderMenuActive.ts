export default function RenderMainContent(index: number) {
    document.querySelector('.active')?.classList.remove('active');
    document.querySelector(`menu__item_${index}`)?.classList.add('active');
}