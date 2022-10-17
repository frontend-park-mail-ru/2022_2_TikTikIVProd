import throttle from "../../Utils/Throttle/Throttle.js";
import IController from "../IController/IController.js";
export default class FeedController extends IController {
    constructor(view, model) {
        super(view, model);
        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));
    }
    // TODO доавить контент если фид пуст
    // Specific
    handleScroll() {
        if (this.isMounted) {
            if (this.checkFeedEnd()) {
                const content = this.getContent();
                this.view.pushContentToFeed(content);
            }
        }
    }
    getContent() {
        // TODO model
        const item = {
            photoLink: '../src/img/test_post_img.jpg',
            description: 'test',
            likes: 123,
            date: 'test',
            author_name: 'test',
            author_photo: '../src/img/test_avatar.jpg',
        };
        const testData = [];
        for (let index = 0; index < 10; index++) {
            testData.push(item);
        }
        return testData;
    }
    checkFeedEnd() {
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
        const threshold = height - screenHeight / 12;
        // Отслеживаем, где находится низ экрана относительно страницы:
        const position = scrolled + screenHeight;
        return position >= threshold; // Если мы пересекли полосу-порог, вызываем нужное действие.
    }
}
// this.view.unbindScrollEvent(this.handleScroll.bind(this));
// this.view.unbindResizeEvent(this.handleScroll.bind(this));
