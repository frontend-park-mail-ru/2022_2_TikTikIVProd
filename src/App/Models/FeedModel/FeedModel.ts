import config from "../../Configs/Config";
import ajax from "../../Ajax/Ajax";
import IModel from "../IModel/IModel"

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
        name: string
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

    public async getPost(id: number | string) {
        let conf = config.api.post;
        conf.url = conf.url.replace('{:id}', id.toString());        
        const response = await ajax(conf);
        console.log(response);
    }

    public async sendNewFeed(data: IFeedNewPost) : Promise<{}>{ 
        const response= await ajax(config.api.postCreate, JSON.stringify(data));

        if(response.status.toString() in config.api.postCreate.statuses.success){
            return Promise.resolve({});
        }

        if(response.status.toString() in config.api.postCreate.statuses.failure){
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
    public async getFeeds(): Promise<{ status: number, body: IFeedData[] }> {
        const response = await ajax(config.api.feed);

        let responseBody: any = response.parsedBody.body.map((feedPost: any) => {
            return {
                id: feedPost.id,
                author: {
                    url: '',
                    avatar: './src/img/avatar_pavel.jpg',
                    name: `${feedPost.user_last_name} ${feedPost.user_first_name}`
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
}

export default FeedModel;