import throttle from "../../Utils/Throttle/Throttle.js";
import FeedView from "../../Views/FeedView/FeedView.js";
import IController from "../IController/IController.js";

export default class FeedController extends IController<FeedView, null> {

    private currentPage: number;
    constructor(view: FeedView, model: null) {
        super(view, model);

        this.view.bindScrollEvent(throttle(this.checkPosition.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.checkPosition.bind(this), 250));
    }

    private addContent(): void {
        console.log('scroll or resize');
    }

    private checkPosition() {
        // Нам потребуется знать высоту документа и высоту экрана:
        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight

        // Они могут отличаться: если на странице много контента,
        // высота документа будет больше высоты экрана (отсюда и скролл).

        // Записываем, сколько пикселей пользователь уже проскроллил:
        const scrolled = window.scrollY

        // Обозначим порог, по приближении к которому
        // будем вызывать какое-то действие.
        // В нашем случае — четверть экрана до конца страницы:
        const threshold = height - screenHeight / 4

        // Отслеживаем, где находится низ экрана относительно страницы:
        const position = scrolled + screenHeight

        if (position >= threshold) {
            // Если мы пересекли полосу-порог, вызываем нужное действие.
            this.addContent();
        }
    }
}