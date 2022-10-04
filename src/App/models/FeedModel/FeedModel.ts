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

    public getFeeds(): Array<IFeedData> {
        const obj: IFeedData = {
            photoLink: '',
            description: 'This is my First Post!',
            likes: 228,
            date: new Date('December 17, 1995 03:24:00'),
            author_name: 'Павел Александров',
            author_photo: ''
        }
        return [obj, obj, obj];
    }
}