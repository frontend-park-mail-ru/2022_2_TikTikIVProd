import ajax from "../../Ajax/Ajax";
import config from "../../Configs/Config";
import IModel from "../IModel/IModel"


export interface ICommunityCreateData {
    avatar_id: number;
    description: string;
    name: string;
}

export interface ICommunityData {
    avatar: string;
    create_date: string;
    description: string;
    id: number;
    name: string;
    owner_id: number;
}

// TODO check fields
export interface ICommunityEditData {
    avatar_id?: number;
    description?: string;
    name?: string;
    owner_id?: number;
}
/**
 * Модель сообществ 
 * @category Models 
 * @extends {IModel}
 */
class CommunityModel extends IModel {
    constructor() {
        super();
    }

    public async create(data: ICommunityCreateData) {
        const response = await ajax(config.api.communitiesCreate, JSON.stringify(data));

        if (response.status.toString() in config.api.communitiesCreate.statuses.success) {
            const community = response.parsedBody.body;
            const data: ICommunityData = {
                avatar: community.avatar_id === 0 ?
                    '../src/img/test_avatar.jpg'
                    :
                    `${config.host}${config.api.image.url}/${community.avatar_id}`,
                create_date: community.create_date,
                description: community.description,
                id: community.id,
                name: community.name,
                owner_id: community.owner_id,
            };

            return Promise.resolve(data);
        }

        if (response.status.toString() in config.api.communitiesCreate.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.communitiesCreate.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    public async delete(communityId: number | string) {

        let conf = config.api.communitiesDelete;
        conf.url = conf.url.replace('{:id}', communityId.toLocaleString());

        const response = await ajax(conf);

        if (response.status.toString() in config.api.communitiesDelete.statuses.success) {
            return Promise.resolve();
        }

        if (response.status.toString() in config.api.communitiesDelete.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.communitiesDelete.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    public async edit(data: ICommunityEditData) {
        const response = await ajax(config.api.communitiesEdit, JSON.stringify(data));

        if (response.status.toString() in config.api.communitiesEdit.statuses.success) {
            const community = response.parsedBody.body;
            const data: ICommunityData = {
                avatar: community.avatar_id === 0 ?
                    '../src/img/test_avatar.jpg'
                    :
                    `${config.host}${config.api.image.url}/${community.avatar_id}`,
                create_date: community.create_date,
                description: community.description,
                id: community.id,
                name: community.name,
                owner_id: community.owner_id,
            };

            return Promise.resolve(data);
        }

        if (response.status.toString() in config.api.communitiesEdit.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.communitiesEdit.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody
            })
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    public async getAll() {
        const response = await ajax(config.api.communitiesAll);

        if (response.status.toString() in config.api.communitiesAll.statuses.success) {
            let data: ICommunityData[] = response.parsedBody.body.map((community: any) => {
                const item: ICommunityData = {
                    avatar: community.avatar_id === 0 ?
                        '../src/img/test_avatar.jpg'
                        :
                        `${config.host}${config.api.image.url}/${community.avatar_id}`,
                    create_date: community.create_date,
                    description: community.description,
                    id: community.id,
                    name: community.name,
                    owner_id: community.owner_id,
                };
                return item;
            });

            return Promise.resolve(data);
        }

        if (response.status.toString() in config.api.communitiesAll.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.communitiesEdit.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody,
            })
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }

    public async get(communityId: number | string) {
        let conf = Object.assign({}, config.api.communitiesGet);
        conf.url = conf.url.replace('{:id}', communityId.toString());

        const response = await ajax(conf);

        if (response.status.toString() in config.api.communitiesGet.statuses.success) {
            const community = response.parsedBody.body;
            let data: ICommunityData = {
                avatar: community.avatar_id === 0 ?
                    '../src/img/test_avatar.jpg'
                    :
                    `${config.host}${config.api.image.url}/${community.avatar_id}`,
                create_date: community.create_date,
                description: community.description,
                id: community.id,
                name: community.name,
                owner_id: community.owner_id,
            };

            return Promise.resolve(data);
        }

        if (response.status.toString() in config.api.communitiesAll.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.communitiesEdit.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.signin.statuses.failure[keyStatus],
                body: response.parsedBody,
            })
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }
};

export default CommunityModel;