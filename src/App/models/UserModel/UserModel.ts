import IModel from "../IModel/IModel.js"

interface IAuthUser {
    email: string;
    password: string;
}

export default class UserModel extends IModel {
    constructor() {
        super();
    }

    public authUser() {
        //TODO
    }
}