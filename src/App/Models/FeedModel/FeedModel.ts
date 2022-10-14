import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js"

export interface IFeedData {
    photoLink: string;
    description: string;
    likes: number;
    date: Date;
    author_name: string;
    author_photo: string;
}

export default class FeedModel extends IModel {
    constructor() {
        super();
    }

    public async getFeeds() {
        const response = await ajax.get(`${config.APIUrl}/feed`);
        let responseStatus: number = response.status;
        let responseBody: any = response.parsedBody.body.map((feedPost: any) => {
            return {
                photoLinks: feedPost.image_links,
                description: feedPost.description,
                likes: 228,
                date: `${new Date(feedPost.create_date).toJSON().slice(0, 10).replace(/-/g, '/')}`,//new Date(feedPost.create_date),
                author_name: feedPost.user_first_name,
                author_photo: ''
            }
        });

        if (response.status === 200) {
            return Promise.resolve({
                status: responseStatus,
                body: responseBody
            })
        }
        else {
            return Promise.reject({
                status: responseStatus,
                body: responseBody
            })
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