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
    [index: string]: string | number;
    id: number;
    first_name: string;
    last_name: string;
    nick_name: string;
    email: string;
    avatar: string;
}


export interface IProfileSettings {
    [index: string]: any;
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    email?: string;
    password?: string;
    avatar?: string;
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
        const response = await ajax(config.api.logout);
        // console.log(
        // 'logout (succ, failed else err)',
        // response.status.toString() in config.api.logout.statuses.success,
        // response.status.toString() in config.api.logout.statuses.failure
        // );

        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignIn} authData - Данные авторизации
     * @return {Promise}
     */
    public async signInUser(authData: IUserSignIn) {
        const response = await ajax(config.api.signin, JSON.stringify(authData));

        if (response.status.toString() in config.api.signin.statuses.success) {
            // console.log('signin success');

            this.currentUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: response.parsedBody.body.avatar === 0 ? '../src/img/test_avatar.jpg' : `${config.host}${config.api.image.url}/${response.parsedBody.avatar}`,
            };
            EventDispatcher.emit('user-changed', this.currentUser);
            const keyStatus = response.status.toString() as keyof typeof config.api.signin.statuses.success;
            return Promise.resolve({
                status: response.status,
                msg: config.api.signin.statuses.success[keyStatus],
                body: response.parsedBody
            })
        }


        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status.toString() in config.api.signin.statuses.failure) {
            // console.log('signin fail');

            const keyStatus = response.status.toString() as keyof typeof config.api.signin.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }
        // console.log('signin err');

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    /**
     * Функция авторизации пользователя. Передаёт серверу данные авторизации.
     * @async
     * @param {IUserSignUp} user - Данные регистрации
     * @return {Promise}
     */
    public async signUpUser(user: IUserSignUp) {
        const response = await ajax(config.api.signup, JSON.stringify(user));

        if (response.status.toString() in config.api.signup.statuses.success) {
            // console.log('signup success');

            this.currentUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: '../src/img/test_avatar.jpg',
            };
            EventDispatcher.emit('user-changed', this.currentUser);
            const keyStatus = response.status.toString() as keyof typeof config.api.signup.statuses.success;
            return Promise.resolve({
                status: response.status,
                msg: config.api.signup.statuses.success[keyStatus],
                body: response.parsedBody
            })
        }

        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status.toString() in config.api.signup.statuses.failure) {
            // console.log('signup fail');

            const keyStatus = response.status.toString() as keyof typeof config.api.signup.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signup.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }
        // console.log('signup err');

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    public async getUser(id: number | string) {
        let conf = Object.assign({}, config.api.userProfile);
        conf.url = conf.url.replace('{:id}', id.toString());

        const response = await ajax(conf);

        if (response.status.toString() in config.api.userProfile.statuses.success) {
            const user: IUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: response.parsedBody.body.avatar === 0 ? '../src/img/test_avatar.jpg' : `${config.host}${config.api.image.url}/${response.parsedBody.avatar}`,
            };
            return Promise.resolve(user);
        }

        return Promise.reject({ status: response.status, body: response.parsedBody });
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
    public async authUserByCookie() {
        const response = await ajax(config.api.auth);

        if (response.status.toString() in config.api.auth.statuses.success) {
            // console.log('auth success');

            this.currentUser = {
                first_name: response.parsedBody.body.first_name,
                last_name: response.parsedBody.body.last_name,
                nick_name: response.parsedBody.body.nick_name,
                email: response.parsedBody.body.email,
                id: response.parsedBody.body.id,
                avatar: response.parsedBody.body.avatar === 0 ? '../src/img/test_avatar.jpg' : `${config.host}${config.api.image.url}/${response.parsedBody.avatar}`,
            };
            EventDispatcher.emit('user-changed', this.currentUser);
            const keyStatus = response.status.toString() as keyof typeof config.api.auth.statuses.success;
            return Promise.resolve({
                status: response.status,
                msg: config.api.auth.statuses.success[keyStatus],
                body: response.parsedBody
            })
        }

        this.currentUser = null;
        EventDispatcher.emit('user-changed', this.currentUser);

        if (response.status.toString() in config.api.auth.statuses.failure) {
            // console.log('auth fail');

            const keyStatus = response.status.toString() as keyof typeof config.api.auth.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.auth.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }

        // console.log('auth err');
        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }


    public async getFriends(userId: string | number) {
        let conf = Object.assign({}, config.api.userFriends);
        conf.url = conf.url.replace('{:id}', userId.toString());

        const response = await ajax(conf);
        console.log(response);

        if (response.status.toString() in config.api.userFriends.statuses.success) {
            let users: IUser[] = response.parsedBody.body.map((rawUser: any) => {
                console.log(rawUser);

                return {
                    first_name: rawUser.first_name,
                    last_name: rawUser.last_name,
                    nick_name: rawUser.nick_name,
                    email: rawUser.email,
                    id: rawUser.id,
                    avatar: rawUser.avatar === 0 ? '../src/img/test_avatar.jpg' : `${config.host}${config.api.image.url}/${rawUser.avatar}`,
                };
            });


            return Promise.resolve({ status: response.status, users: users });
        }

        if (response.status.toString() in config.api.userFriends.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.userFriends.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.userFriends.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }

    public async isFriend(userId: number | string): Promise<boolean> {
        const currentUserId = this.currentUser?.id;
        if (!currentUserId) {
            return Promise.reject();
        }

        const friends = (await this.getFriends(currentUserId)).users;

        return Promise.resolve(friends.find(user => user.id.toString() === userId.toString()) !== undefined ? true : false);
    }

    public async addFriend(userId: string | number) {
        let conf = Object.assign({}, config.api.addFriend);
        conf.url = conf.url.replace('{:id}', userId.toString());

        const response = await ajax(conf);

        if (response.status.toString() in config.api.addFriend.statuses.success) {
            return Promise.resolve();
        }

        if (response.status.toString() in config.api.addFriend.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.addFriend.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.addFriend.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }

    public async removeFriend(userId: string | number) {
        let conf = Object.assign({}, config.api.deleteFriend);
        conf.url = conf.url.replace('{:id}', userId.toString());

        const response = await ajax(conf);

        if (response.status.toString() in config.api.deleteFriend.statuses.success) {
            return Promise.resolve();
        }

        if (response.status.toString() in config.api.deleteFriend.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.deleteFriend.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.deleteFriend.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }

    public async updateUserData(newData: IProfileSettings) {
        const response = await ajax(config.api.userUpdate, JSON.stringify(newData));

        if (response.status.toString() in config.api.deleteFriend.statuses.success) {

            try {
                let newCurrentUser = Object.assign({}, this.currentUser);
                Object.keys(newData).forEach(key => {
                    newCurrentUser[key] = newData[key];
                });
                this.currentUser = newCurrentUser;
                EventDispatcher.emit('user-changed', this.currentUser);

            }
            catch (error) {
                console.log(error);
            }

            return Promise.resolve();
        }

        if (response.status.toString() in config.api.deleteFriend.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.deleteFriend.statuses.failure;

            return Promise.reject({
                status: response.status,
                msg: config.api.deleteFriend.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
            body: response.parsedBody,
        });
    }
}

export default UserModel;