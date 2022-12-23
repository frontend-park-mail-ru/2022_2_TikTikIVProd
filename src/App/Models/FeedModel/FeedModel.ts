import config, { IApiItem } from "../../Configs/Config";
import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
import IModel from "../IModel/IModel"
import dateParser from "../../Utils/DateParser/DateParser";
import ImageUploadModel, { IImage } from "../ImageModel/ImageModel";

export interface INewComment {
    message: string;
    post_id: number;
}

export interface IEditComment {
    message: string;
    post_id: number;
    id: number;
}

export interface IComment {
    avatar_id: string,
    create_date: string;
    id: number;
    message: string;
    post_id: number;
    user_first_name: string;
    user_id: number;
    user_last_name: string;
}


export interface IFeedType {
    user?: { id: string | number },
    group?: { id: string | number },
    // Если пустой, то общий фид
}

/**
 * Интерфейс данных, содержащихся в посте в ленте
 * @category Feed 
 * @typedef {Object} IFeedData
 * @property {number} id - Уникальный номер поста
 * @property {Object} author - Данные о авторе поста
 * @property {string} author.avatar - Ссылка на аватар
 * @property {string} author.name - Имя пользователя
 * @property {string} author.url - Ссылка на страницу
 * @property {number} likes  - Количество лайков на посте
 * @property {string} text - Текстовое содержимое поста
 * @property {string} date  - Дата публикации поста
 * @property {Array.<{src: string}>} attachments - Вложения в пост (URL картинок)
 */
export interface IFeedData {
    id: number;
    author: {
        url: string,
        avatar: string,
        first_name: string,
        last_name: string,
        id: number,
    };
    date: string;
    text: string;
    likes: number;
    isLiked: string;
    attachments: IImage[];
    community_id: number,
}

export interface IFeedNewPost {
    message: string;
    community_id: number,
    attachments: IImage[],
}

export interface IFeedCardEditData {
    id: number;
    message: string;
    community_id: number,
    attachments: IImage[],
}

/**
 * Модель ленты 
 * @category Models 
 * @extends {IModel}
 */
class FeedModel extends IModel {
    constructor() {
        super();
    }

    private parseComment(json: any): IComment {
        return {
            avatar_id: json.avatar_id === 0
                ?
                config.default_img
                :
                config.host + `${config.api.image.url.replace('{:id}', json.avatar_id)}`,

            create_date: dateParser(json.create_date),
            id: json.id,
            message: json.message,
            post_id: json.post_id,
            user_first_name: json.user_first_name,
            user_id: json.user_id,
            user_last_name: json.user_last_name,
        }
    }

    private parseComments(json: any): IComment[] {
        return json.map((rawComment: any) => {
            return this.parseComment(rawComment);
        });
    }

    private parseFeedCard(json: any): IFeedData {
        return {
            id: json.id,
            author: {
                url: '',
                avatar: json.avatar_id === 0
                    ? config.default_img
                    :
                    config.host + `${config.api.image.url.replace('{:id}', json.avatar_id)}`,
                first_name: json.user_first_name,
                last_name: json.user_last_name,
                id: json.user_id,
            },
            date: dateParser(json.create_date),
            text: json.message,
            likes: json.count_likes,
            isLiked: json.is_liked ? "liked" : "unliked",
            attachments: ImageUploadModel.parseImages(json.attachments),

            community_id: json.community_id,
        };
    }

    private parseFeedCards(json: any): IFeedData[] {
        return json.map((rawFeedCard: any) => {
            return this.parseFeedCard(rawFeedCard);
        });
    }

    public async deletePost(id: number | string) {
        let conf = Object.assign({}, config.api.postDelete);
        conf.url = conf.url.replace('{:id}', id.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    public async getPost(id: number | string) {
        let conf = Object.assign({}, config.api.post);
        conf.url = conf.url.replace('{:id}', id.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const feedCard = this.parseFeedCard(response.parsedBody.body);
        return Promise.resolve(feedCard);
    }

    public async getUserPosts(userId: string) {
        let conf = Object.assign({}, config.api.userPosts);
        conf.url = conf.url.replace("{:id}", userId);
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const feedCards = this.parseFeedCards(response.parsedBody.body);
        return Promise.resolve(feedCards);
    }

    public async sendEditedFeed(data: IFeedCardEditData) {
        const response = await ajax(config.api.postEdit, JSON.stringify(data));
        await checkResponseStatus(response, config.api.postEdit);
        const feedCard = this.parseFeedCard(response.parsedBody.body);
        return Promise.resolve(feedCard);
    }

    public async sendNewFeed(data: IFeedNewPost) {
        const response = await ajax(config.api.postCreate, JSON.stringify(data));
        await checkResponseStatus(response, config.api.postCreate);
        const feedCard = this.parseFeedCard(response.parsedBody.body);
        return Promise.resolve(feedCard);
    }

    /**
     * Функция получения постов ленты с сервера
     * @async
     * @return {Promise}
     */
    public async getFeeds(feedType: IFeedType) {
        let conf = Object.assign({}, config.api.feed); // Весь фид

        if (feedType.user) { // Посты пользователя
            conf = Object.assign({}, config.api.userPosts);
            conf.url = conf.url.replace('{:id}', feedType.user.id.toString());
        }

        if (feedType.group) { // Посты сообщества
            conf = Object.assign({}, config.api.communitiesPosts);
            conf.url = conf.url.replace('{:id}', feedType.group.id.toString());
        }

        let response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const feedCards = this.parseFeedCards(response.parsedBody.body);
        return Promise.resolve(feedCards);
    }

    /**
     * Функция лайка поста по его id.
     * @async
     * @return {Promise}
     */
    public async likePost(postId: string) {
        console.log("deb testing");
        let conf = Object.assign({}, config.api.postLike);
        conf.url = conf.url.replace('{:id}', postId);
        let response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    /**
     * Функция анлайка поста по его id.
     * @async
     * @return {Promise}
     */
    public async unlikePost(postId: string) {
        let conf = Object.assign({}, config.api.postUnlike);
        conf.url = conf.url.replace('{:id}', postId);
        let response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }


    public async addComment(data: INewComment) {
        let conf = Object.assign({}, config.api.addComment);
        conf.url = conf.url.replace('{:id}', data.post_id.toString());
        let response = await ajax(conf, JSON.stringify(data));
        await checkResponseStatus(response, conf);
        const comment = this.parseComment(response.parsedBody.body);
        return Promise.resolve(comment);
    }

    public async deleteComment(commentID: number | string) {
        let conf = Object.assign({}, config.api.deleteComment);
        conf.url = conf.url.replace('{:id}', commentID.toString());
        let response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    public async getComments(postID: number | string) {
        let conf = Object.assign({}, config.api.getComments);
        conf.url = conf.url.replace('{:id}', postID.toString());
        let response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const comments: IComment[] = this.parseComments(response.parsedBody.body);
        return Promise.resolve(comments);
    }

    public async editComment(data: IEditComment) {
        let conf = Object.assign({}, config.api.editComment);
        conf.url = conf.url.replace('{:id}', data.post_id.toString());
        let response = await ajax(conf, JSON.stringify(data));
        await checkResponseStatus(response, conf);
        const comment = this.parseComment(response.parsedBody.body);
        return Promise.resolve(comment);
    }
}

export default FeedModel;