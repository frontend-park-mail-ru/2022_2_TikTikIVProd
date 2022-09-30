export default function renderProfile() {
    const mainElement = document.createElement('div');
    const div = document.createElement('div');
    mainElement.appendChild(div);
    div.innerText = "PROFILE!";
    return mainElement;
}
