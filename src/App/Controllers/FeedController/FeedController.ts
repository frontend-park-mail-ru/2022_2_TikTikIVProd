import config from "../../Configs/Config";
import FeedModel, { IFeedData, IFeedNewPost, IFeedType, INewComment } from "../../Models/FeedModel/FeedModel";
import ImageUploadModel, { IImage } from "../../Models/ImageModel/ImageModel";
import { IUser } from "../../Models/UserModel/UserModel";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import router from "../../Router/Router";
import debounce from "../../Utils/Debounce/Debounce";
import { checkScrollEnd } from "../../Utils/Scrollbar/CheckPosition/CheckPosition";
import throttle from "../../Utils/Throttle/Throttle";
import AttachmentsUploadView from "../../Views/AttachmentsUploadView/AttachmentsUploadView";
import FeedView from "../../Views/FeedView/FeedView";
import AttachmentsUploadController from "../AttachmentsUploadController/AttachmentsUploadController";
import IController from "../IController/IController";

class FeedController extends IController<FeedView, FeedModel> {
    private user: IUser; // TODO delete
    // private currentFeedType: FeedType;
    private currentPage: number;

    // NEW!!!!!
    private feedType: IFeedType;
    //
    private newPostAttachmentsController: AttachmentsUploadController;

    constructor(view: FeedView, model: FeedModel) {
        super(view, model);
        this.currentPage = 0;
        this.feedType = {};

        this.newPostAttachmentsController = new AttachmentsUploadController();

        this.view.bindScrollEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindResizeEvent(throttle(this.handleScroll.bind(this), 250));
        this.view.bindClickEvent(this.handleClickOnFeed.bind(this));
        this.view.bindKeyClick(this.handleKeyClick.bind(this));


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

    private async submitNewFeedCard() {

        const content = this.view.getNewPostData();
        if (content.text.length < 1) return Promise.reject('empty');

        //
        const imgs = await this.newPostAttachmentsController.submitAttachments();
        //&& imgs.length < 1

        const feedCardData: IFeedNewPost = {
            attachments: imgs,
            message: content.text,
            community_id: content.community_id ?? 0,
        };

        const feedCard = await this.model.sendNewFeed(feedCardData)
        this.view.hideFeedCardCreation();
        this.view.pushContentToFeed(feedCard, this.user.id);
        return Promise.resolve();

    }

    private submitEditedFeedCard(): void {
        const content = this.view.getEditedPostData();
        if (!content.id || !content.text || content.text.length < 1) return;
        this.model.getPost(content.id)
            .then(oldData => {
                let newData = oldData;
                newData.text = content.text ?? '';
                this.model.sendEditedFeed(newData)
                    .then(feedCard => {
                        this.view.hideFeedCardCreation();
                        this.view.changePost(feedCard);
                    })

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
                this.view.hideCommentsForFeedCard(id);

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
            if (this.feedType.user && this.feedType.user.id !== this.user.id) {
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

            const cardId = (<HTMLElement>target.closest("[data-feed_card_id"))?.dataset['feed_card_id'];
            const data = (<HTMLElement>target.closest("[data-data]"))?.dataset['data'];

            switch (action) {
                case 'sumbit_edited_post': {
                    this.submitEditedFeedCard();
                    return;
                }
                case 'sumbit_new_post': {
                    this.submitNewFeedCard()
                        .then((msg) => {
                            console.log('submitted', msg);
                        })
                        .catch((err) => {
                            console.log('err', err);
                        });
                    return;
                }
                case 'submit_search': {
                    // TODO to to model to search posts;
                    // // console.log('seatch posts');
                    return;
                }

                case 'create_feed': {

                    this.newPostAttachmentsController.flush();

                    this.view.showFeedCardCreation(this.user, this.newPostAttachmentsController.getElement(), undefined, this.feedType?.group?.id);
                    return;
                }

                case 'close_overlay': {
                    this.view.hideFeedCardCreation();
                    return;
                }

                case 'like': {
                    if (!cardId) return;
                    const likesCountElement = document.getElementById(`feed-card-likes__count-${cardId}`);

                    const button = <HTMLImageElement>target;

                    debounce(this.model.likePost, 500);

                    if (target.classList.contains('feed-card__button__unliked')) {
                        this.model.likePost(cardId)
                            .then(() => {
                                button.src = "../src/img/like_filled_icon.svg";
                                target.classList.toggle("feed-card__button__liked");
                                target.classList.remove("feed-card__button__unliked")
                                if (likesCountElement !== null) {
                                    likesCountElement.innerText = String(Number(likesCountElement.innerText) + 1);
                                }
                            });
                    }

                    if (target.classList.contains('feed-card__button__liked')) {
                        this.model.unlikePost(cardId)
                            .then(() => {
                                button.src = "../src/img/like_icon.svg";
                                target.classList.toggle("feed-card__button__unliked");
                                target.classList.remove("feed-card__button__liked")
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
                            this.view.showFeedCardCreation(this.user, this.newPostAttachmentsController.getElement(), feedCard, feedCard.community_id);
                        })
                        .catch(msg => {
                            // console.log('edit open, err');
                        });
                    return;
                }

                case 'delete': {
                    if (!cardId) return;
                    this.deletePost(cardId);
                    return;
                }

                case 'profile_page': {
                    if (!data) return;
                    // TODO убрать отсюда
                    let url = Object.assign({}, config.api.userProfile).url;
                    url = url.replace('{:id}', data.toString());
                    router.goToPath(url);
                    return;
                }

                case 'share': {
                    return;
                }

                case 'card_page': {
                    this.openFeedCard(cardId);
                    return;
                }
                case 'comment': {
                    if (!cardId) return;
                    this.openComments(cardId);
                    return;
                }

                case 'send_comment': {
                    if (!cardId) return;
                    this.sendNewComment(cardId);
                    return;
                }

                case 'comment_delete': {
                    const commentId = (<HTMLElement>target.closest('.comment'))?.dataset['id'];
                    if (!commentId || !cardId) return;
                    this.deleteComment(cardId, commentId);
                    return;
                }

                case 'comment_edit': {
                    console.log('edit');
                    return;
                }

                case 'add_image': {
                    this.newPostAttachmentsController.addAttachment();
                    return;
                }

                case 'smile': {
                    // ОБРАБОТКА СМАЙЛОВ
                    const currentMessage = document.querySelector('textarea');
                    if (currentMessage !== null && currentMessage !== undefined) {
                        currentMessage.value += target.innerText;
                    }
                }

                default: {
                    return;
                }
            }
        }
    }

    private handleKeyClick(event: KeyboardEvent): void {
        if (event.key === 'Enter' && event.ctrlKey) {
            event.preventDefault();
            const currentMessage = document.querySelector('textarea');
            if (currentMessage !== null && currentMessage !== undefined) {
                currentMessage.value += '\n';
            }
        }
        else if (event.key === 'Enter') {
            event.preventDefault();
            const currentMessage = document.querySelector('textarea');
            if (currentMessage === null || currentMessage === undefined) return;
            const cardId = (<HTMLElement>currentMessage.closest("[data-feed_card_id"))?.dataset['feed_card_id'];
            if (!cardId) return;
            const text = this.view.getNewCommentData(cardId);
            const newComment: INewComment = {
                message: text,
                post_id: Number(cardId),
            };
            console.log(newComment);

            this.model.addComment(cardId, newComment)
                .then(comment => {
                    console.log(comment);
                    this.view.pushCommentToFeedCard(cardId, this.user.id, comment);
                })
                .catch(err => {
                    console.log(err);
                });
            return;
        }
        else if (event.key === "Esc" || event.key === "Escape") {
            this.view.hideFeedCardCreation();
            return;
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

    private openPost(postId: number | string): void {

    }

    private openComments(postId: number | string): void {
        this.model.getComments(postId)
            .then(comments => {
                this.view.showCommentsForFeedCard(postId, this.user.id, comments);
            })
            .catch(err => {
                console.log(err);
            })
    }

    private closeComments(postId: number | string): void {

    }

    private deleteComment(cardId: number | string, commentId: number | string): void {
        this.model.deleteComment(commentId)
            .then(() => {
                this.view.removeComment(cardId, commentId);
            })
            .catch(err => {
                console.log(err);
            });
    }

    private sendNewComment(cardId: number | string): void {
        const text = this.view.getNewCommentData(cardId);
        const newComment: INewComment = {
            message: text,
            post_id: Number(cardId),
        };
        console.log(newComment);

        this.model.addComment(cardId, newComment)
            .then(comment => {
                console.log(comment);
                this.view.pushCommentToFeedCard(cardId, this.user.id, comment);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default FeedController;
