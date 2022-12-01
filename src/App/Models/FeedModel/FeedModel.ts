import config, { IApiItem } from "../../Configs/Config";
import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
import IModel from "../IModel/IModel"
import dateParser from "../../Utils/DateParser/DateParser";

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
    attachments: { src: string }[];
    community_id: number,
}

export interface IFeedNewPost {
    images: { src: string }[];
    message: string;
    id?: number; //TODO

    community_id: number,
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

    private parseFeedCard(json: any): IFeedData {
        return {
            id: json.id,
            author: {
                url: '',
                avatar: json.avatar_id === 0 ? './src/img/default_avatar.png' : `${config.host}${config.api.image.url}/${json.avatar_id}`,
                first_name: json.user_first_name,
                last_name: json.user_last_name,
                id: json.user_id,
            },
            date: dateParser(json.create_date),
            text: json.message,
            likes: json.count_likes,
            isLiked: json.is_liked ? "liked" : "unliked",
            attachments: json.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
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

    public async sendEditedFeed(data: IFeedNewPost) {
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
}

export default FeedModel;