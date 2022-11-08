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
        console.log(response);
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
                    avatar: './src/img/avatar_pavel.jpg',
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

    public async sendNewFeed(data: IFeedNewPost): Promise<{}> {
        const response = await ajax(config.api.postCreate, JSON.stringify(data));

        if (response.status.toString() in config.api.postCreate.statuses.success) {
            return Promise.resolve({});
        }

        if (response.status.toString() in config.api.postCreate.statuses.failure) {
            const keyCode = response.status.toString() as keyof typeof config.api.postCreate.statuses.failure;
            console.log(keyCode, config.api.postCreate.statuses.failure[keyCode]);
            return Promise.reject({});
        }

        console.log('Create post err');
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

        // if(feedType.group){} // TODO

        let response = await ajax(conf);

        if (response.status in config.api.image.statuses.success) {
            let feeds: IFeedData[] = response.parsedBody.body.map((rawFeed: any) => {
                return {
                    id: rawFeed.id,
                    author: {
                        id: rawFeed.user_id,
                        url: '',
                        avatar: './src/img/avatar_pavel.jpg',
                        first_name: rawFeed.user_first_name,
                        last_name: rawFeed.user_last_name,
                    },
                    date: `${new Date(rawFeed.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                    text: rawFeed.message,
                    likes: 228,
                    attachments: rawFeed.images.map((elem: any) => { return `${config.host}${config.api.image.url}/${elem.id}` }),
                }
            });
            return Promise.resolve({ status: response.status, feeds: feeds });
        }
        else {
            return Promise.reject({ status: response.status, feeds: [] });
        }
    }
}

export default FeedModel;