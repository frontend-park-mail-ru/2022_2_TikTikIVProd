import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js";
export default class UserModel extends IModel {
    constructor() {
        super();
        this.currentUser = null;
    }
    async authUser() {
        //Remove in the future
        this.currentUser = { firstName: 'Павел' };
        return ajax.post(`${config.APIUrl}/auth`, '');
    }
    getCurrentUser() {
        return this.currentUser;
    }
    isAuthantificated() {
        return this.currentUser !== null ? true : false;
    }
}
