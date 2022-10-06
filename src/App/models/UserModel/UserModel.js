import config from "../../configs/config.js";
import ajax from "../../modules/ajax.js";
import IModel from "../IModel/IModel.js";
export default class UserModel extends IModel {
    constructor() {
        super();
        this.currentUser = null;
    }
    async authUser(authData) {
        console.log(authData);
        return;
        const response = await ajax.post(`${config.APIUrl}/signin`, JSON.stringify(authData));
        this.currentUser = {
            firstName: response.parsedBody.body.first_name
        };
        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            });
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            });
        }
    }
    async registerUser(email, password, first_name, last_name, nickname) {
        const response = await ajax.post(`${config.APIUrl}/signup`, JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            password: password
        }));
        this.currentUser = {
            firstName: response.parsedBody.body.first_name
        };
        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            });
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            });
        }
    }
    getCurrentUser() {
        return this.currentUser;
    }
    async isAuthantificated() {
        const response = await ajax.get(`${config.APIUrl}/auth`);
        this.currentUser = { firstName: response.parsedBody.body.first_name };
        if (response.status === 200) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            });
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            });
        }
    }
}
