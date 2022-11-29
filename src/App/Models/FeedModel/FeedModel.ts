import config, { IApiItem } from "../../Configs/Config";
import ajax from "../../Ajax/Ajax";
import IModel from "../IModel/IModel"

// export type UserFeed = {
//     userId: number,
// };

// function isUserFeed(object: any): object is UserFeed {
//     return 'userId' in object;
// }

// export type AllFeed = {
//     [Key in any]: never; // Пустой объект
// };

// function isAllFeed(object: any): object is AllFeed {
//     return Object.keys(object).length == 0;
// }

// export type FeedType = UserFeed | AllFeed;

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
    attachments: { src: string }[];
}

export interface IFeedNewPost {
    images: { src: string }[];
    message: string;

    user_id: number; // TODO
    user_first_name: string; // TODO
    user_last_name: string; // TODO

    create_date: string; // TODO
    id: number; //TODO
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

    public async deletePost(id: number | string) {
        let conf = Object.assign({}, config.api.postDelete);
        conf.url = conf.url.replace('{:id}', id.toString());
        const response = await ajax(conf);
        if (response.status.toString() in conf.statuses.success) {
            return Promise.resolve({ status: response.status, body: response.parsedBody });
        }

        if (response.status.toString() in conf.statuses.failure) {
            return Promise.reject({ status: response.status, body: response.parsedBody });
        }

        if (response.status.toString() in conf.statuses.success) {
            return Promise.resolve({ status: response.status, body: response.parsedBody });
        }
    }

    public async getPost(id: number | string) {
        let conf = Object.assign({}, config.api.post);
        conf.url = conf.url.replace('{:id}', id.toString());
        const response = await ajax(conf);

        if (response.status.toString() in conf.statuses.success) {
            const feedPost = response.parsedBody.body;
            const feed: IFeedData = {
                id: feedPost.id,
                author: {
                    url: '',
                    avatar: feedPost.avatar_id === 0 ? './src/img/avatar_pavel.jpg' : `${config.host}${config.api.image.url}/${feedPost.avatar_id}`,
                    first_name: feedPost.user_first_name,
                    last_name: feedPost.user_last_name,
                    id: feedPost.user_id,
                },
                date: `${new Date(feedPost.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                text: feedPost.message,
                likes: 228,
                attachments: feedPost.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
            }

            return Promise.resolve(feed);
        }
        // // console.log(response);
        return Promise.reject();
    }

    public async getUserPosts(userId: string) {
        let conf = Object.assign({}, config.api.userPosts);
        conf.url = conf.url.replace("{:id}", userId);
        const response = await ajax(conf);

        let responseBody: any = response.parsedBody.body.map((feedPost: any) => {
            return {
                id: feedPost.id,
                author: {
                    url: '',
                    avatar: feedPost.avatar_id === 0 ? './src/img/avatar_pavel.jpg' : `${config.host}${config.api.image.url}/${feedPost.avatar_id}`,
                    first_name: feedPost.user_first_name,
                    last_name: feedPost.user_last_name,
                },
                date: `${new Date(feedPost.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                text: feedPost.message,
                likes: 228,
                attachments: feedPost.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
            }
        });

        const result = {
            status: response.status,
            body: responseBody,
        };

        if (response.status in config.api.image.statuses.success) {
            return Promise.resolve(result);
        }
        else {
            return Promise.reject(result);
        }
    }

    public async sendEditedFeed(data: IFeedNewPost) {
        const response = await ajax(config.api.postEdit, JSON.stringify(data));

        if (response.status.toString() in config.api.postCreate.statuses.success) {
            const rawPost = response.parsedBody.body;
            const data: IFeedData = {
                id: rawPost.id,
                author: {
                    id: rawPost.user_id,
                    url: '',
                    avatar: rawPost.avatar_id === 0 ? './src/img/avatar_pavel.jpg' : `${config.host}${config.api.image.url}/${rawPost.avatar_id}`,
                    first_name: rawPost.user_first_name,
                    last_name: rawPost.user_last_name,
                },
                date: `${new Date(rawPost.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                text: rawPost.message,
                likes: 228,
                attachments: rawPost.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
            };
            return Promise.resolve(data);
        }

        if (response.status.toString() in config.api.postCreate.statuses.failure) {
            const keyCode = response.status.toString() as keyof typeof config.api.postCreate.statuses.failure;
            // // console.log(keyCode, config.api.postCreate.statuses.failure[keyCode]);
            return Promise.reject({});
        }

        // // console.log('Create post err');
        return Promise.reject({});
    }

    public async sendNewFeed(data: IFeedNewPost) {
        const response = await ajax(config.api.postCreate, JSON.stringify(data));

        if (response.status.toString() in config.api.postCreate.statuses.success) {
            const rawPost = response.parsedBody.body;
            const data: IFeedData = {
                id: rawPost.id,
                author: {
                    id: rawPost.user_id,
                    url: '',
                    avatar: rawPost.avatar_id === 0 ? './src/img/avatar_pavel.jpg' : `${config.host}${config.api.image.url}/${rawPost.avatar_id}`,
                    first_name: rawPost.user_first_name,
                    last_name: rawPost.user_last_name,
                },
                date: `${new Date(rawPost.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                text: rawPost.message,
                likes: 228,
                attachments: rawPost.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
            };
            return Promise.resolve(data);
        }

        if (response.status.toString() in config.api.postCreate.statuses.failure) {
            const keyCode = response.status.toString() as keyof typeof config.api.postCreate.statuses.failure;
            // // console.log(keyCode, config.api.postCreate.statuses.failure[keyCode]);
            return Promise.reject({});
        }

        // // console.log('Create post err');
        return Promise.reject({});
    }
    /**
     * Функция получения постов ленты с сервера
     * @async
     * @return {Promise}
     */
    public async getFeeds(feedType: IFeedType): Promise<{ status: number, feeds: IFeedData[] }> {
        let conf = Object.assign({}, config.api.feed); // Весь фид

        if (feedType.user) { // Посты пользователя
            conf = Object.assign({}, config.api.userPosts);
            conf.url = conf.url.replace('{:id}', feedType.user.id.toString());
        }

        if (feedType.group) { // Посты сообщества
            conf = Object.assign({}, config.api.communitiesPosts);
            conf.url = conf.url.replace('{:id}', feedType.group.id.toString());
        }
        // if(feedType.group){} // TODO

        let response = await ajax(conf);

        if (response.status in config.api.image.statuses.success) {
            let feeds: IFeedData[] = response.parsedBody.body.map((rawFeed: any) => {
                return {
                    id: rawFeed.id,
                    author: {
                        id: rawFeed.user_id,
                        url: '',
                        avatar: rawFeed.avatar_id === 0 ? './src/img/avatar_pavel.jpg' : `${config.host}${config.api.image.url}/${rawFeed.avatar_id}`,
                        first_name: rawFeed.user_first_name,
                        last_name: rawFeed.user_last_name,
                    },
                    date: `${new Date(rawFeed.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                    text: rawFeed.message,
                    likes: rawFeed.count_likes,
                    isLiked: rawFeed.is_liked ? "liked" : "unliked",
                    attachments: rawFeed.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
                }
            });
            return Promise.resolve({ status: response.status, feeds: feeds });
        }
        else {
            return Promise.reject({ status: response.status, feeds: [] });
        }
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

        if (response.status in config.api.postLike.statuses.success) {
            return Promise.resolve({ status: response.status });
        }
        else {
            return Promise.reject({ status: response.status });
        }
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

        if (response.status in config.api.postLike.statuses.success) {
            return Promise.resolve({ status: response.status });
        }
        else {
            return Promise.reject({ status: response.status });
        }
    }
}

export default FeedModel;