export default function renderFeed() {
    const mainElement = document.createElement('div');
    const div = document.createElement('div');
    mainElement.appendChild(div);
    div.innerText = "FEED!";
    // ajax.get({
    //     url: '/feed',
    //     callback: (status, responseString) => {
    // let isAuthorized = false;
    //         if (status === 200) {
    //             isAuthorized = true;
    //         }
    // if (!isAuthorized) {
    //     alert('АХТУНГ НЕТ АВТОРИЗАЦИИ');
    //     goToPage(config.menu.login);
    //     return;
    // }
    //         const images = JSON.parse(responseString);
    //         if (images && Array.isArray(images)) {
    //             const div = document.createElement('div');
    //             mainElement.appendChild(div);
    //             images.forEach(({ src, likes }) => {
    //                 div.innerHTML += `<img width="400" src="${src}"/><div>${likes} лайков</div>`;
    //             })
    //         }
    //     }
    // })
    return mainElement;
}
