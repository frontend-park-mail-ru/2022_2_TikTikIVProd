import FeedModel, { IFeedData } from "../../Models/FeedModel/FeedModel";
import throttle from "../../Utils/Throttle/Throttle";
import FeedView from "../../Views/FeedView/FeedView";
import IController from "../IController/IController";

export default class FeedController extends IController<FeedView, FeedModel> {
    private currentPage: number;

    constructor(view: FeedView, model: FeedModel) {
        super(view, model);
        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));
    }

    // TODO доавить контент если фид пуст
    // Specific

    private handleScroll(): void {
        if (this.isMounted) {
            if (this.checkFeedEnd()) {
                const content = this.getContent();
                this.view.pushContentToFeed(content);
            }
        }
    }


    private getContent(): IFeedData[] {
        // TODO model
        const item: IFeedData = {
            photoLink: '../src/img/test_post_img.jpg',
            description: 'test',
            likes: 123,
            date: 'test',
            author_name: 'test',
            author_photo: '../src/img/test_avatar.jpg',
        }
        const testData = [];
        for (let index = 0; index < 10; index++) {
            testData.push(item);
        }

        return testData;
    }

    private checkFeedEnd(): boolean {
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

        return position >= threshold;  // Если мы пересекли полосу-порог, вызываем нужное действие.
    }
}



// this.view.unbindScrollEvent(this.handleScroll.bind(this));
// this.view.unbindResizeEvent(this.handleScroll.bind(this));