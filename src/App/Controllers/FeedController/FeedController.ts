import FeedModel, { IFeedData } from "../../Models/FeedModel/FeedModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import throttle from "../../Utils/Throttle/Throttle";
import FeedView from "../../Views/FeedView/FeedView";
import IController from "../IController/IController";

/**
 * Котроллер для ленты
 * @category Feed
 * @extends {IController<FeedView, FeedModel>}
 * @param  {FeedView} view - Объект вида компонента лента
 * @param  {FeedModel} model - Объект модели ленты
 */
class FeedController extends IController<FeedView, FeedModel> {
    /**
     * Текущая страница в ленте
     * (приватное поле класса)
     * @property {number} currentPage
     */
    private currentPage: number;

    constructor(view: FeedView, model: FeedModel) {
        super(view, model);
        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));

        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        // TODO убрать
        const content = this.getContent();
        this.view.pushContentToFeed(content);
    }

    // TODO доавить контент если фид пуст
    // Specific

    /**
     * Функция обработки события пролистывания страницы
     * Проверяет нужно ли отрисовывать следующую часть ленты и при необходимости получает её и отправляет в вид
     * (приватное поле класса)
     * @returns {void}
     */
    private handleScroll(): void {
        if (this.isMounted) {
            if (this.checkFeedEnd()) {
                const content = this.getContent();
                this.view.pushContentToFeed(content);
            }
        }
    }

    /**
     * Функция получения постов ленты из модели
     * (приватное поле класса)
     * @returns {IFeedData[]}
     */
    private getContent(): IFeedData[] {
        // TODO model
        const item: IFeedData = {
            author: { avatar: '../src/img/test_avatar.jpg', name: 'Test User' },
            date: '01.01.2001',
            text: 'Sample text of feed card. Sample text of feed card. Sample text of feed card. Sample text of feed card. ',
            likes: 100500,
            attachments: [{ src: '../src/img/test_post_img.jpg' }],
        }
        const testData = [];
        for (let index = 0; index < 10; index++) {
            testData.push(item);
        }
        // console.log(testData);
        

        return testData;
    }

    /**
     * Функция проверяют долистал ли пользователь ленту до низа
     * (приватное поле класса)
     * @returns {boolean}
     */
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

export default FeedController;
