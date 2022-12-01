import config from "../../Configs/Config";
import FeedModel, { IFeedData, IFeedNewPost, IFeedType } from "../../Models/FeedModel/FeedModel";
import { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import { checkScrollEnd } from "../../Utils/Scrollbar/CheckPosition/CheckPosition";
import throttle from "../../Utils/Throttle/Throttle";
import FeedView from "../../Views/FeedView/FeedView";
import IController from "../IController/IController";

class FeedController extends IController<FeedView, FeedModel> {
    private user: IUser; // TODO delete
    // private currentFeedType: FeedType;
    private currentPage: number;

    // NEW!!!!!
    private feedType: IFeedType;
    //

    constructor(view: FeedView, model: FeedModel) {
        super(view, model);

        this.currentPage = 0;

        //
        this.feedType = {};
        //

        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindClickEvent(this.handleClickOnFeed.bind(this));

        EventDispatcher.subscribe('unmount-all', this.unmountComponent.bind(this));
        EventDispatcher.subscribe('user-changed', this.setCurrentUser.bind(this)); // TODO delete
    }

    public setFeedContent(feedType: IFeedType) {
        if (JSON.stringify(this.feedType) === JSON.stringify(feedType)) return; // НЕ поменялся тип фида;

        this.feedType = feedType;
        this.view.clearFeed();
        this.currentPage = 0;
    }

    private openFeedCard(id: string | undefined): void {
        // TODO!
        if (!id) return;
        this.model.getPost(id)
            .then(feedCard => {
                console.log(feedCard);
            })
            .catch(msg => {
                console.log(msg);

            })
    }

    private submitNewFeedCard(): void {
        const content = this.view.getNewPostData();
        if (content.text.length < 1) return;

        const feedCardData: IFeedNewPost = {
            images: [],
            message: content.text,
            community_id: content.community_id ?? 0,
        };

        this.model.sendNewFeed(feedCardData)
            .then(feedCard => {
                this.view.hideFeedCardCreation();
                this.view.pushContentToFeed(feedCard, this.user.id);
            })
            .catch(msg => {
                // TODO Post create show err to view
            });
    }

    private submitEditedFeedCard(): void {
        const content = this.view.getEditedPostData();
        if (!content.id || !content.text || content.text.length < 1) return;

        const feedCardData: IFeedNewPost = {
            id: Number(content.id), // TODO errors
            message: content.text,

            images: [], // TODO
            community_id: content.community_id ?? 0,
        };

        this.model.sendEditedFeed(feedCardData)
            .then(feedCard => {
                this.view.hideFeedCardCreation();
                this.view.changePost(feedCard);
            })
            .catch(msg => {
                console.log(msg);
                // TODO Post create show err to view
            });
    }

    private deletePost(id: number | string): void {
        this.model.deletePost(id)
            .then(() => {
                this.view.deletePost(id);
                console.log('delete');
                
            })
            .catch(msg => {
                // console.log('Delete post err: ', status, body);
            })
    }

    // TODO DELETE
    public setCurrentUser(user: IUser) {
        this.user = user;
    }
    //

    private async getFeeds(): Promise<{ page: number, feeds: IFeedData[], currentUserId: number }> {
        let data: IFeedData[] = [];
        let page = 0;

        await this.model.getFeeds(this.feedType)
            .then(feedCards => {
                data = feedCards;
                page = 1; // TODO
            })
            .catch(msg => {
                page = 1; // TODO
            });

        return { page: page, feeds: data, currentUserId: this.user.id };
    }

    public mountComponent(): void {
        if (!this.isMounted) {
            if (this.currentPage == 0) {
                this.getFeeds()
                    .then(({ page, feeds, currentUserId }) => {
                        this.view.pushContentToFeed(feeds, currentUserId);
                        this.currentPage = page;
                    });
            }
            this.view.show();
            let showFeedCreationButton = true;
            if(this.feedType.user && this.feedType.user.id !== this.user.id){
                showFeedCreationButton = false;
            } 
            this.view.showNavbar(showFeedCreationButton);
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

            if (!action) return;

            const cardId = (<HTMLElement>target.closest(".feed-card"))?.id;
            const data = (<HTMLElement>target.closest("[data-data]"))?.dataset['data'];

            switch (action) {
                case 'sumbit_edited_post': {
                    this.submitEditedFeedCard();
                    return;
                }
                case 'sumbit_new_post': {
                    this.submitNewFeedCard();
                    return;
                }
                case 'submit_search': {
                    // TODO to to model to search posts;
                    // // console.log('seatch posts');
                    return;
                }

                case 'create_feed': {
                    this.view.showFeedCardCreation(this.user, undefined, this.feedType?.group?.id);
                    return;
                }

                case 'close_overlay': {
                    this.view.hideFeedCardCreation();
                    return;
                }

                case 'like': {
                    const likesCountElement = document.getElementById(`feed-card-likes__count-${cardId}`);

                    if (target.firstElementChild === undefined || target.firstElementChild === null) return;

                    if (target.firstElementChild.classList.contains('feed-card__button__unliked')) {
                        this.model.likePost(cardId)
                            .then(() => {
                                if (target.firstElementChild === undefined || target.firstElementChild === null)
                                    return;

                                target.firstElementChild.classList.toggle("feed-card__button__liked");
                                target.firstElementChild.classList.remove("feed-card__button__unliked")
                                if (likesCountElement !== null) {
                                    likesCountElement.innerText = String(Number(likesCountElement.innerText) + 1);
                                }
                            });
                    }

                    if (target.firstElementChild.classList.contains('feed-card__button__liked')) {
                        this.model.unlikePost(cardId)
                            .then(() => {
                                if (target.firstElementChild === undefined || target.firstElementChild === null)
                                    return;

                                target.firstElementChild.classList.toggle("feed-card__button__unliked");
                                target.firstElementChild.classList.remove("feed-card__button__liked")
                                if (likesCountElement !== null) {
                                    if (likesCountElement.innerText !== "0") {
                                        likesCountElement.innerText = String(Number(likesCountElement.innerText) - 1);
                                    }
                                }
                            });
                    }

                    return;
                }

                case 'edit': {
                    if (!cardId) return;

                    this.model.getPost(cardId)
                        .then(feedCard => {
                            this.view.showFeedCardCreation(this.user, feedCard, feedCard.community_id);
                        })
                        .catch(msg => {
                            // console.log('edit open, err');
                        });
                    return;
                }

                case 'delete': {
                    this.deletePost(cardId);
                    return;
                }

                case 'profile_page': {
                    if (data) {

                        // TODO убрать отсюда

                        let url = Object.assign({}, config.api.userProfile).url;
                        url = url.replace('{:id}', data.toString());
                        router.goToPath(url);
                    }
                    return;
                }

                case 'share': {
                    return;
                }

                case 'card_page':
                case 'comment': {
                    this.openFeedCard(cardId);
                    return;
                }

                default: {
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
    private handleScroll(e: Event): void {
        if (!this.isMounted) return;
        const target = <HTMLElement>e.target;
        if (!checkScrollEnd(target, 2)) return;
        this.getFeeds()
            .then(({ page, feeds }) => {
                this.view.pushContentToFeed(feeds, this.user.id);
                this.currentPage = page; // TODO
            });
    }

    /**
     * Функция получения постов ленты из модели
     * (приватный метод класса)
     * @returns {IFeedData[]}
     */
}

export default FeedController;
