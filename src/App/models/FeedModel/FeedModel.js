import IModel from "../IModel/IModel.js";
export default class FeedModel extends IModel {
    constructor() {
        super();
    }
    getFeeds() {
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
