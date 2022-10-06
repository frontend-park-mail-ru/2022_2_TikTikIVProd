import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js";
export default class FeedModel extends IModel {
    constructor() {
        super();
    }
    async getFeeds() {
        const response = await ajax.get(`${config.APIUrl}/feed`);
        let responseStatus = response.status;
        let responseBody = response.parsedBody.body.map((feedPost) => {
            return {
                photoLinks: feedPost.image_links,
                description: feedPost.description,
                likes: 228,
                date: new Date(feedPost.create_date),
                author_name: feedPost.user_first_name,
                author_photo: ''
            };
        });
        if (response.status === 200) {
            return Promise.resolve({
                status: responseStatus,
                body: responseBody
            });
        }
        else {
            return Promise.reject({
                status: responseStatus,
                body: responseBody
            });
        }
        // const obj: IFeedData = {
        //     photoLink: '',
        //     description: 'This is my First Post!',
        //     likes: 228,
        //     date: new Date('December 17, 1995 03:24:00'),
        //     author_name: 'Павел Александров',
        //     author_photo: ''
        // }
        // return [obj, obj, obj];
    }
}
