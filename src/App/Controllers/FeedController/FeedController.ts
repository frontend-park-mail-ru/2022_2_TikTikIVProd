import FeedModel, { FeedType, IFeedData, IFeedNewPost } from "../../Models/FeedModel/FeedModel";
import { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import throttle from "../../Utils/Throttle/Throttle";
import FeedView from "../../Views/FeedView/FeedView";
import IController from "../IController/IController";

class FeedController extends IController<FeedView, FeedModel> {
    private user: IUser; // TODO delete

    private currentFeedType: FeedType;
    private currentPage: number;

    constructor(view: FeedView, model: FeedModel) {
        super(view, model);

        this.currentPage = 0;
        this.currentFeedType = {};

        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindClickEvent(this.handleClickOnFeed.bind(this));

        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('user-changed', this.setCurrentUser.bind(this)); // TODO delete
    }

    private openFeedCard(id: string | undefined): void {
        if(!id) {
            return;
        }

        this.model.getPost(id);
    }

    private submitNewPost(): void {
        console.log('submit new post');

        const content = this.view.getNewPostData();
        if (content.text.length < 1) {
            console.log('Post create empty form');
            return;
        }

        const data: IFeedNewPost = {

            images: [],
            message: content.text,

            // TODO  delete this shit
            user_id: this.user.id,
            user_first_name: this.user.first_name,
            user_last_name: this.user.last_name,

            create_date: '2022-08-15T00:00:00Z',
            id: 0,
            // TODO
        };
        
        this.model.sendNewFeed(data)
            .then(() => {
                this.view.hideFeedCardCreation();
            })
            .catch(() => {
                console.log('Post create show err to view');
                // TODO Post create show err to view
            });
    }

    public changeFeedType(feedType: FeedType): void {
        if (JSON.stringify(this.currentFeedType) === JSON.stringify(feedType)) {
            return;
        }

        this.currentFeedType = feedType;
        this.currentPage = 0;
        this.view.clearFeed();
    }

    private deletePost(id : number | string) : void { 
        console.log(id);
        
        this.model.deletePost(id)
        .then(()=>{
            this.view.deletePost(id);
        })
        .catch(({status, body}) => {
            console.log('Delete post err: ', status, body);
        })
    } 

    // TODO DELETE
    public setCurrentUser(user: IUser) {
        this.user = user;
    }

    private async getFeeds(): Promise<{page: number, feeds: IFeedData[], currentUserId: number}> {
        let data: IFeedData[] = [];
        let page = 0;

        await this.model.getFeeds(this.currentFeedType)
            .then(({ feeds }) => {
                data = feeds;
                page = 1; // TODO
            })
            .catch(({ status, body }) => {
                const item: IFeedData = {
                    id: 321,
                    author: { id: 0, url: '/testuser123', avatar: '../src/img/test_avatar.jpg', name: 'Неопознанный Капи' },
                    date: 'В будующем...',
                    text: 'Ваши друзья еще не выложили свой первый пост. Напомните им об этом!',
                    likes: 100500,
                    attachments: [{ src: '../src/img/test_post_img.jpg' }],
                }
                data.push(item);
                page = 1; // TODO
            });


        return {page: page, feeds: data, currentUserId: this.user.id};
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            if (this.currentPage == 0) {
                this.getFeeds()
                    .then(({page, feeds, currentUserId}) => {
                        this.view.pushContentToFeed(feeds, currentUserId);
                        this.currentPage = page;
                    });
            }
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

            if (target.classList.contains('feed__overlay')) {
                this.view.hideFeedCardCreation();
                return;
            }

            const action = (<HTMLElement>target.closest("[data-action]"))?.dataset['action'];
            const cardId = (<HTMLElement>target.closest(".feed-card"))?.id;
            const data = (<HTMLElement>target.closest("[data-data]"))?.dataset['data'];

            if (!action) {
                console.log('No handler: ', target);
                return;
            }

            switch (action) {
                case 'sumbit_new_post': {
                    this.submitNewPost();
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

                case 'delete': {
                    console.log('click delete post');
                    
                    this.deletePost(cardId);
                    return;
                }

                case 'profile_page': {
                    if (data) {
                        console.log('profile ', data);
                        router.goToPath(data);
                    }
                    return;
                }

                case 'share': {
                    console.log('share');
                    return;
                }

                case 'card_page':
                case 'comment': {
                    this.openFeedCard(cardId);
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
                this.getFeeds(this.currentFeedType)
                .then(({page, feeds}) => {
                    this.view.pushContentToFeed(feeds);
                    this.currentPage = page; // TODO
                });
            }
        }
    }

    /**
     * Функция получения постов ленты из модели
     * (приватный метод класса)
     * @returns {IFeedData[]}
     */


    /**
     * Функция проверяют долистал ли пользователь ленту до низа
     * (приватный метод класса)
     * @returns {boolean}
     */
    private checkFeedEnd(): boolean {
        const height = document.body.offsetHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const threshold = height - screenHeight / 12;
        const position = scrolled + screenHeight;
        return position >= threshold;
    }
}

export default FeedController;
