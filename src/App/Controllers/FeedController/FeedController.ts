import FeedModel, { IFeedData } from "../../Models/FeedModel/FeedModel";
import { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
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

    private user: IUser;

    constructor(view: FeedView, model: FeedModel) {
        super(view, model);
        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindClickEvent(this.handleClickOnFeed.bind(this));

        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('user-changed', this.setCurrentUser.bind(this));
        // TODO убрать
        this.getContent().then((content) => {
            this.view.pushContentToFeed(content);
        });
    }

    // TODO доавить контент если фид пуст
    public setCurrentUser(user: IUser) {
        this.user = user;
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            this.view.show();
            this.view.showNavbar();
            this.isMounted = true;
        }
    }

    public unmountComponent(): void {
        if (this.isMounted) {
            this.view.hide();
            this.view.hideNavbar();
            this.view.hideFeedCardCreation();
            this.isMounted = false;
        }
    }

    /**
     * Функция обработки клина на ленту
     * (приватный метод класса)
     * @param  {Event} event - Объект события
     * @return {void}
     */
    private handleClickOnFeed(event: Event): void {
        event.preventDefault();
        if (this.isMounted) {
            const target = <HTMLElement>event.target;

            if(target.classList.contains('feed__overlay')) {
                this.view.hideFeedCardCreation();
                return;
            }
            
            const action = (<HTMLElement>target.closest("[data-action]"))?.dataset['action'];
            const cardId = (<HTMLElement>target.closest("[data-id]"))?.dataset['id'];
            const data = (<HTMLElement>target.closest("[data-data]"))?.dataset['data'];

            if(!action) { 
                console.log('No handler: ', target);
                return;
            }

            switch(action) {
                case 'sumbit_new_post':{
                    // TODO to to model to submit new post;
                    console.log('submit new post');
                    this.view.hideFeedCardCreation();
                    return;
                }
                case 'submit_search': {
                    // TODO to to model to search posts;
                    console.log('seatch posts');
                    return;
                }
                
                case 'create_feed': {
                    this.view.showFeedCardCreation(this.user);
                    return;
                }

                case 'like': {
                    console.log('like');
                    return;
                }

                case 'edit': {
                    console.log('edit');
                    return;
                }

                case 'profile_page': {
                    if (data) {
                        console.log('profile ', data);
                        router.goToPath(data);
                    }
                    return;
                }

                case 'delete': {
                    console.log('delete');
                    return;
                }

                case 'share': {
                    console.log('share');
                    return;
                }

                case 'card_page':
                case 'comment': {
                    console.log('feed card: ', location + '/' + cardId);
                    router.goToPath(location + '/' + cardId);
                    return;
                }
                
                default: {
                    console.log('action unknown');
                    return;
                }
            }
        }
    }

    /**
     * Функция обработки события пролистывания страницы
     * Проверяет нужно ли отрисовывать следующую часть ленты и при необходимости получает её и отправляет в вид
     * (приватный метод класса)
     * @returns {void}
     */
    private handleScroll(): void {
        console.log('scroll');

        if (this.isMounted) {
            if (this.checkFeedEnd()) {
                this.getContent().then((content) => {
                    this.view.pushContentToFeed(content);
                });
            }
        }
    }

    /**
     * Функция получения постов ленты из модели
     * (приватный метод класса)
     * @returns {IFeedData[]}
     */
    private async getContent(): Promise<IFeedData[]> {
        // TODO model
        const data: IFeedData[] = [];

        const model: FeedModel = new FeedModel();
        await model.getFeeds().then(({status, body}) => {
            body.forEach((elem) => {
                data.push(elem);
            })
        }).catch(({status, body}) => {
            const item: IFeedData = {
                id: 321,
                author: { url: '/testuser123', avatar: '../src/img/test_avatar.jpg', name: 'Неопознанный Капи' },
                date: 'В будующем...',
                text: 'Ваши друзья еще не выложили свой первый пост. Напомните им об этом!',
                likes: 100500,
                attachments: [{ src: '../src/img/test_post_img.jpg' }],
            }
            data.push(item);
        });
        

        return data;
    }

    /**
     * Функция проверяют долистал ли пользователь ленту до низа
     * (приватный метод класса)
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
