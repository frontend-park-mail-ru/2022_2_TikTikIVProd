import feedCardTemplate from "../../Components/FeedCard/FeedCard.hbs";
import "../../Components/FeedCard/FeedCard.scss";

import feedCardCreationTemplate from "../../Components/FeedCardCreate/FeedCardCreate.hbs";
import "../../Components/FeedCardCreate/FeedCardCreate.scss";

import smilesTemplate from "../../Components/Smiles/Smiles.hbs";
import "../../Components/Smiles/Smiles.scss";

import feedNavbarTemplate from "../../Components/FeedNavbar/FeedNavbar.hbs";
import "../../Components/FeedNavbar/FeedNavbar.scss";

import feedTemplate from "./FeedView.hbs";
import "./FeedView.scss";

import commentSectionTemplate from "../../Components/CommentSection/CommentSection.hbs";
import "../../Components/CommentSection/CommentSection.scss";

import commentTemplate from "../../Components/Comment/Comment.hbs";
import "../../Components/Comment/Comment.scss";

import commentCreationTemplate from "../../Components/CommentCreate/CommentCreate.hbs";
import "../../Components/CommentCreate/CommentCreate.scss";

import { IComment, IEditComment, IFeedCardEditData, IFeedData } from "../../Models/FeedModel/FeedModel";
import IView from "../IView/IView";
import { IUser } from "../../Models/UserModel/UserModel"

/**
 * Отображение для ленты новостей
 * @category Feed
 * @extends {IView}
 * @property {HTMLElement} parent - Родительский элемент для ленты новостей
 */
class FeedView extends IView {
    private navbar: HTMLElement;
    private cards: HTMLElement;
    private overlay: HTMLElement;
    private currentOpenedCommentId: string | number;


    constructor(parent: HTMLElement) {
        super(parent, feedTemplate({}), '.feed');
        this.navbar = <HTMLElement>this.element.querySelector('.feed__navbar');
        this.cards = <HTMLElement>this.element.querySelector('.feed__cards');
        this.overlay = <HTMLElement>this.element.querySelector('.feed__overlay');

        const observer = new MutationObserver(this.checkFeedCards.bind(this));
        observer.observe(this.cards, { childList: true });

        this.currentOpenedCommentId = -1;
    }


    private checkFeedCards() {
        if (!this.cards.querySelector('.feed-card')) {
            this.element.querySelector('.feed-mock')?.classList.remove('feed--hide');
        } else {
            this.element.querySelector('.feed-mock')?.classList.add('feed--hide');
        }
    }
    /**
     * Функция добавления обработчика события пролистывания страницы
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindScrollEvent(listener: any): void {
        this.cards.addEventListener('scroll', listener.bind(this));
    }

    /**
     * Функция добавления обработчика события изменения размера страницы
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindResizeEvent(listener: any): void {
        this.cards.addEventListener('resize', listener.bind(this));
    }

    /**
     * Функция добавления обработчика события нажатия на ленту
     * @param  {any} listener - Callback функция для события
     * @returns {void}
     */
    public bindClickEvent(callback: Function): void {
        this.element.addEventListener('click', callback.bind(this));
    }

    public bindKeyClick(callback: Function): void {
        this.element.addEventListener('keydown', callback.bind(this));
    }


    // Specific

    public clearFeed(): void {
        this.cards.innerHTML = '';
    }


    public getEditedPostData(): IFeedCardEditData {

        const form = this.overlay.querySelector('.feed-card-create');
        if (!form) throw new Error('cant get feed card creation form');

        const id = form?.id;
        const text = (<HTMLTextAreaElement>form.querySelector('.feed-card-create__text')).value;
        const community_id = (<HTMLElement>form)?.dataset['community_id'];
        return { 
            id: Number(id), 
            message: text, 
            community_id: community_id ?  Number(community_id) : 0,
            attachments: [],
        };
    }

    public getNewPostData(): { text: string, community_id: number | undefined } {
        const form = this.overlay.querySelector('.feed-card-create');
        if (!form) {
            // console.log('Post create no form');
            return { text: '', community_id: undefined };
        }

        const textar = <HTMLTextAreaElement>form.querySelector('.feed-card-create__text')
        const text = textar.value;
        const community_id = (<HTMLElement>form).dataset['community_id'];
        return { text: text, community_id: community_id ? Number(community_id) : undefined };
    }

    /**
     * Функция отрисовки контента (постов) в ленте новостей снизу
     * @param  {IFeedData[]} data - Данные о постах
     * @return {void}
     */
    public pushContentToFeed(data: IFeedData | IFeedData[], currentUserId: number): void {
        // TODO
        const f = (item: IFeedData) => {

            let tempItem = item.isLiked === 'liked' ? Object.assign(item, { isLikedIcon: true }) : item;
            tempItem = currentUserId !== item.author.id ? item : Object.assign(item, { showTools: true })

            const card = feedCardTemplate(tempItem);
            this.cards.innerHTML += card;
        }
        if (Array.isArray(data)) {
            data.forEach((item) => f(item));
        } else {
            f(data);
        }
    }

    /**
     * Функция отрисовки контента (постов) в ленте новостей сверху
     * @param  {IFeedData[]} data - Данные о постах
     * @return {void}
     */
    public pushContentToFeedUp(data: IFeedData | IFeedData[], currentUserId: number): void {
        // TODO
        const f = (item: IFeedData) => {

            let tempItem = item.isLiked === 'liked' ? Object.assign(item, { isLikedIcon: true }) : item;
            tempItem = currentUserId !== item.author.id ? item : Object.assign(item, { showTools: true })

            const card = feedCardTemplate(tempItem);
            this.cards.innerHTML = card + this.cards.innerHTML;
        }
        if (Array.isArray(data)) {
            data.forEach((item) => f(item));
        } else {
            f(data);
        }
    }

    public deletePost(id: number | string): void {
        const feed = this.cards.querySelector(`[data-feed_card_id="${id}"]`);
        if (!feed) {
            return;
        }
        this.hideCommentsForFeedCard(id);
        this.cards.removeChild(feed);
    }

    public changePost(data: IFeedData): void {
        const oldCard = this.cards.querySelector(`[data-feed_card_id="${data.id}"]`);
        if (!oldCard) {
            return;
        }
        const parser = new DOMParser();
        const newCard = parser.parseFromString(feedCardTemplate(Object.assign(data, { showTools: true, isLiked: data.isLiked, isLikedIcon: data.isLiked })), 'text/html').querySelector('.feed-card');
        if (!newCard) {
            return;
        }
        this.cards.insertBefore(newCard, oldCard);
        this.cards.removeChild(oldCard);
    }

    public showFeedCardCreation(user: IUser, attachmentsElement: HTMLElement, exsData?: IFeedData, community_id?: string | number | undefined): void {
        const smiles = smilesTemplate();
        this.overlay.innerHTML = feedCardCreationTemplate({
            user: user,
            data: exsData,
            community_id: community_id,
            smiles: smiles
        });

        this.overlay.style.visibility = 'visible';

        // 
        const attachments = this.overlay.querySelector('.feed-card-create__attachments');
        if (!attachments) return;

        attachments.appendChild(attachmentsElement);
        //

    }

    public hideFeedCardCreation(): void {
        this.overlay.innerHTML = '';
        this.overlay.style.visibility = 'collapse';
    }

    public showNavbar(showCreationButton: boolean): void {
        this.navbar.innerHTML = feedNavbarTemplate({ showCreationButton: showCreationButton });
        this.navbar.style.visibility = 'visible';
    }

    public hideNavbar(): void {
        this.navbar.style.visibility = 'collapse';
    }

    public pushCommentToFeedCard(postId: number | string, currentUserId: number | string, comment: IComment): void {
        const commentsArea = this.cards.querySelector(`.comment-section[data-feed_card_id="${postId}"] .comment-section__comments`);
        if (!commentsArea) return;
        commentsArea.innerHTML += commentTemplate(Object.assign(comment, { showTools: comment.user_id === currentUserId }));
    }

    public showCommentsForFeedCard(postId: number | string, currentUserId: number | string, comments: IComment[]): void {
        let commentSection = this.cards.querySelector(`.comment-section[data-feed_card_id="${postId}"]`);
        if (commentSection) {
            this.hideCommentsForFeedCard(postId);
            return;
        }

        const temp = document.createElement('template');
        temp.innerHTML = commentSectionTemplate({ postId });

        const newCommentSection = temp.content.querySelector(`.comment-section`);
        if (!newCommentSection) return;

        const createArea = newCommentSection.querySelector('.comment-section__creation');
        if (!createArea) return;
        createArea.innerHTML = commentCreationTemplate({ postId: postId, comment: undefined });

        const feedCard = this.cards.querySelector(`[data-feed_card_id="${postId}"]`);
        if (!feedCard) return;

        this.hideCommentsForFeedCard(this.currentOpenedCommentId);

        feedCard.parentNode?.insertBefore(newCommentSection, feedCard.nextSibling);

        comments.forEach(comment => {
            this.pushCommentToFeedCard(postId, currentUserId, comment);
        });

        this.currentOpenedCommentId = postId;
    }

    public changeEditedComment(currentUserId: number | string, data: IComment): void {
        const commentsSection = this.cards.querySelector(`.comment-section[data-feed_card_id="${data.post_id}"] .comment-section__comment`);
        if (!commentsSection) return;

        const oldComment = commentsSection.querySelector(`.comment[data-post_id="${data.post_id}" data-id="${data.id}]`);
        if (!oldComment) return;

        this.currentOpenedCommentId = data.post_id;

        const temp = document.createElement('template');
        temp.innerHTML = commentTemplate(Object.assign(data, { showTools: data.user_id === currentUserId }));

        const newComment = temp.querySelector('.comment');
        if (!newComment) return;

        commentsSection.insertBefore(newComment, oldComment);
        commentsSection.removeChild(oldComment);
    }

    public editComment(commentId: number | string): void {
        const comment = this.cards.querySelector(`.comment[data-id="${commentId}"]`);
        if (!comment) {
            console.log('no comm');
            return;
        }
        
        const postId = (<HTMLElement>comment).dataset['post_id'];
        if (!postId) {
            console.log('no post id');
            return;
        }
        const text = (<HTMLElement>comment.querySelector('.comment__content')).innerText;

        const creationFormContainer = comment.closest('.comment-section')?.querySelector('.comment-section__creation');
        if(!creationFormContainer) {
            console.log('no form cont');
            return;
        }

        const creationFormOld = creationFormContainer.querySelector('.comment-create');
        if (!creationFormOld) {
            console.log('no old cr form');
            return;
        }

        const parser = new DOMParser();
        const creationFormNew = parser.parseFromString(commentCreationTemplate({ postId: postId, comment: { text: text, id: commentId } }), 'text/html').querySelector('.comment-create');
        if (!creationFormNew) {
            console.log('no new cr form');
            return;
        }


        creationFormContainer.insertBefore(creationFormNew, creationFormOld);
        creationFormContainer.removeChild(creationFormOld);
    }

    public hideCommentsForFeedCard(postId: number | string): void {
        const commentSection = this.cards.querySelector(`.comment-section[data-feed_card_id="${postId}"]`);
        if (!commentSection) return;
        this.cards.removeChild(commentSection);
    }

    public getEditedCommentData(postId: number | string): IEditComment {
        const commentCreate = <HTMLTextAreaElement>this.cards.querySelector(`.comment-create[data-post_id="${postId}"]`);

        const text = (<HTMLTextAreaElement>commentCreate.querySelector('textarea')).value;
        const id = commentCreate.dataset['comment_id'] ?? '0';
        const data: IEditComment = {
            post_id: Number(postId),
            message: text,
            id: Number(id),
        }
        return data;
    }

    public getNewCommentData(postId: number | string): string {
        const textar = <HTMLTextAreaElement>this.cards.querySelector(`.comment-create[data-post_id="${postId}"] textarea`);
        return textar.value;
    }

    public clearCommentCreation(postId: number | string): void {
        const textar = <HTMLTextAreaElement>this.cards.querySelector(`.comment-create[data-post_id="${postId}"] textarea`);
        textar.value = '';
    }

    public removeComment(postId: number | string, commentId: number | string): void {
        const comments = <HTMLElement>this.cards.querySelector(`.comment-section[data-feed_card_id="${postId}"] .comment-section__comments`);
        const comment = comments.querySelector(`.comment[data-id="${commentId}"][data-post_id="${postId}"]`);
        if (!comment) return;
        comments.removeChild(comment);
    }

    public showErrNewFeedTextEmpty(): void {
        const textar = <HTMLTextAreaElement>this.overlay.querySelector('.feed-card-create')?.querySelector('.feed-card-create__text');
        textar.classList.add('feed-card-create--err');
    }

    public hideErrNewFeedTextEmpty(): void {
        const textar = <HTMLTextAreaElement>this.overlay.querySelector('.feed-card-create')?.querySelector('.feed-card-create__text');
        textar.classList.remove('feed-card-create--err');
    }
}

export default FeedView;