import config from "../../Configs/Config";
import ajax from "../../Modules/Ajax";
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
    author: { url: string, avatar: string, name: string };
    date: string;
    text: string;
    likes: number;
    attachments: { src: string }[];
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

    /**
     * Функция получения постов ленты с сервера
     * @async
     * @return {Promise}
     */
    public async getFeeds() : Promise<{status: number, body: IFeedData[]}>{

        const response = await ajax.get(`${config.APIUrl}${config.API.feed.url}`);
        let responseBody: any = response.parsedBody.body.map((feedPost: any) => {
            return {
                id: feedPost.id,
                author: { 
                    url: '',
                    avatar: 'https://video-editor.su/images/kak-snimalsya-film-avatar_01.jpg', 
                    name: `${feedPost.user_last_name} ${feedPost.user_first_name}` 
                },
                date: `${new Date(feedPost.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,
                text: feedPost.message,
                likes: 228,
                attachments: feedPost.images.map((elem: any) => {return `${config.APIUrl}${config.API.image.url}/${elem.id}`}),
            }
        });

        const result = {
            status: response.status,
            body: responseBody,
        };

        if (response.status === config.API.feed.status.success) {
            return Promise.resolve(result);
        }
        else {
            return Promise.reject(result);
        }
    }
}

export default FeedModel;