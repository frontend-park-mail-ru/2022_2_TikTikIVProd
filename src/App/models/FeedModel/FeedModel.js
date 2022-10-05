import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js";
export default class FeedModel extends IModel {
    constructor() {
        super();
    }
    getFeeds() {
        const response = ajax.get(`${config.APIUrl}/feed`);
        response.then(({ status, parsedBody }) => {
        }).catch(({ status, parsedBody }) => {
        });
        const obj = {
            photoLink: '',
            description: 'This is my First Post!',
            likes: 228,
            date: new Date('December 17, 1995 03:24:00'),
            author_name: 'Павел Александров',
            author_photo: ''
        };
        return [obj, obj, obj];
    }
}
