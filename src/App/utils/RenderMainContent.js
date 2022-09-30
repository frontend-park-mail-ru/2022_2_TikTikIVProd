export default function RenderMainContent(root, mainContentElement, menuElement) {
    var _a, _b;
    mainContentElement.innerHTML = '';
    (_a = root === null || root === void 0 ? void 0 : root.querySelector('.active')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
    (_b = root === null || root === void 0 ? void 0 : root.querySelector(`[data-section=${menuElement.href.slice(1)}]`)) === null || _b === void 0 ? void 0 : _b.classList.add('active');
    mainContentElement.appendChild(menuElement.render());
}
