export default function RenderMainContent(root: HTMLElement, mainContentElement: HTMLElement, menuElement: { href: string | any[]; render: () => any; }) {
    mainContentElement.innerHTML = '';
    root?.querySelector('.active')?.classList.remove('active');
    root?.querySelector(`[data-section=${menuElement.href.slice(1)}]`)?.classList.add('active');


    mainContentElement.appendChild(menuElement.render());
}