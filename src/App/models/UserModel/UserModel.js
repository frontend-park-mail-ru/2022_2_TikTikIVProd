import IModel from "../IModel/IModel.js";
export default class UserModel extends IModel {
    constructor() {
        super();
        this.currentUser = null;
    }
    authUser() {
        //TODO
        this.currentUser = { firstName: 'Павел' };
    }
    getCurrentUser() {
        return this.currentUser;
    }
    isAuthantificated() {
        return this.currentUser !== null ? true : false;
    }
}
