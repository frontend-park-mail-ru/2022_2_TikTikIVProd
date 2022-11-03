import config from "../../Configs/Config";
import ajax from "../../Ajax/Ajax";
import EventDispatcher from "../../Modules/EventDispatcher/EventDispatcher";
import IModel from "../IModel/IModel"

/**
 * Интерфейс данных, необходимых для авторизации
 * @category User 
 * @typedef {Object} IUserSignIn
 * @property {string}  email - Email, привязанный к аккаунту
 * @property {string} password - Пароль от аккаунта
 */
export interface IUserSignIn { // ПО api
    email: string;
    password: string;
}

/**
 * Интерфейс данных, необходимых для регистрании нового пользователя
 * @category User 
 * @typedef {Object} IUserSignUp
 * @property {string}  first_name - Имя пользователя
 * @property {string} last_name - Фамилия пользователя
 * @property {string} nick_name  - Псевдоним
 * @property {string}  email - Email для входа в аккаунт
 * @property {string} password - Пароль от аккаунта
 */
export interface IUserSignUp { // ПО api
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    password: string;
}

/**
 * Интерфейс, содержащий данные о пользователе
 * @category User 
 * @typedef {Object} IUserSignUp
 * @property {string} id - Идентификатор, присвоенный аккаунту
 * @property {string}  first_name - Имя пользователя
 * @property {string} last_name - Фамилия пользователя
 * @property {string} nick_name  - Псевдоним
 * @property {string}  email - Email для входа в аккаунт
 */
export interface IUser { // ПО api !!!!Без пароля 
    id: string;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    avatar: string;
}

/**
 * Модель пользователя
 * @category Models 
 * @extends {IModel}
 */
class UserModel extends IModel {
    /**
     * Данные о текущем пользователе
     * (приватное поле класса)
     * @type {IUser | null}
     */
    private currentUser: IUser | null; //TODO private

    constructor() {
        super();
        this.currentUser = null;
    }

    /**
     * Функция деавторизации пользователя. Сообщает серверу что пользователь вышел из аккаунта
     * @async
     * @return {Promise}
     */
    public async logoutUser() {
        ajax(config.api.logout);
        this.currentUser = null;
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignIn} authData - Данные авторизации
     * @return {Promise}
     */
    public async authUser(authData: IUserSignIn) {
        const response = await ajax(config.api.signin, JSON.stringify(authData));
        this.currentUser = {
            first_name: response.parsedBody.body.first_name,
            last_name: response.parsedBody.body.last_name,
            nick_name: response.parsedBody.body.nick_name,
            email: response.parsedBody.body.email,
            id: response.parsedBody.body.id,
            avatar: '../src/img/test_avatar.jpg',
        };

        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status === config.api.signin.statuses.success) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            })
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            })
        }
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignUp} user - Данные регистрации
     * @return {Promise}
     */
    public async registerUser(user: IUserSignUp) {
        const response = await ajax(config.api.signup, JSON.stringify(user));
        this.currentUser = {
            first_name: response.parsedBody.body.first_name,
            last_name: response.parsedBody.body.last_name,
            nick_name: response.parsedBody.body.nick_name,
            email: response.parsedBody.body.email,
            id: response.parsedBody.body.id,
            avatar: '../src/img/test_avatar.jpg',
        };

        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status === config.api.signup.statuses.success) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            })
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            })
        }
    }

    /**
     * Функция возвращает данные авторизованного пользователя
     * @returns {IUser|null}
     */
    public getCurrentUser(): IUser | null {
        return this.currentUser;
    }

    /**
     * Функция проверки авторизации с использованием куки.
     * @async
     * @return {Promise}
     */
    public async isAuthantificated() {
        const response = await ajax(config.api.auth);
        this.currentUser = {
            first_name: response.parsedBody.body.first_name,
            last_name: response.parsedBody.body.last_name,
            nick_name: response.parsedBody.body.nick_name,
            email: response.parsedBody.body.email,
            id: response.parsedBody.body.id,
            avatar: '../src/img/test_avatar.jpg',
        };

        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status === config.api.auth.statuses.success) {
            return Promise.resolve({
                status: response.status,
                body: response.parsedBody
            })
        }
        else {
            return Promise.reject({
                status: response.status,
                body: response.parsedBody
            })
        }
    }
}

export default UserModel;