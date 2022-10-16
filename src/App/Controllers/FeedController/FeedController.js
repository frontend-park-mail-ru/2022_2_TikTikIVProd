import IController from "../IController/IController.js";
export default class FeedController extends IController {
    constructor(view, model) {
        super(view, model);
    }
    // interface
    mountComponent() {
        if (!this.isMounted) {
            this.view.show();
            this.view.bindScrollEvent(this.handleScroll.bind(this));
            this.view.bindResizeEvent(this.handleScroll.bind(this));
            this.isMounted = true;
            //
            this.addContent();
        }
    }
    unmountComponent() {
        if (this.isMounted) {
            this.view.unbindScrollEvent(this.handleScroll.bind(this));
            this.view.unbindResizeEvent(this.handleScroll.bind(this));
            this.view.hide();
            this.isMounted = false;
        }
    }
    // Specific
    handleScroll() {
        // TODO throttle
        this.checkPosition();
    }
    addContent() {
        const item = {
            photoLink: '../src/img/test_post_img.jpg',
            description: 'test',
            likes: 123,
            date: 'test',
            author_name: 'test',
            author_photo: 'test',
        };
        const testData = [];
        for (let index = 0; index < 10; index++) {
            testData.push(item);
        }
        this.view.pushContentToFeed(testData);
    }
    checkPosition() {
        // Нам потребуется знать высоту документа и высоту экрана:
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        // Они могут отличаться: если на странице много контента,
        // высота документа будет больше высоты экрана (отсюда и скролл).
        // Записываем, сколько пикселей пользователь уже проскроллил:
        const scrolled = window.scrollY;
        // Обозначим порог, по приближении к которому
        // будем вызывать какое-то действие.
        // В нашем случае — четверть экрана до конца страницы:
        const threshold = height - screenHeight / 4;
        // Отслеживаем, где находится низ экрана относительно страницы:
        const position = scrolled + screenHeight;
        if (position >= threshold) {
            // Если мы пересекли полосу-порог, вызываем нужное действие.
            this.addContent();
        }
    }
}
