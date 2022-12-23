import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
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
    count_subs: number;
    is_subscriber: boolean;
}

// TODO check fields
export interface ICommunityEditData {
    avatar_id?: number;
    description?: string;
    name?: string;
    owner_id?: number;
    id?: number;
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

    private parseCommunity(json: any): ICommunityData {
        return {
            avatar: json.avatar_id === 0 ?
                config.default_img
                :
                config.host + `${config.api.image.url.replace('{:id}', json.avatar_id)}`,
            create_date: json.create_date,
            description: json.description,
            id: json.id,
            name: json.name,
            owner_id: json.owner_id,
            count_subs: json.count_subs,
            is_subscriber: json.is_subscriber,
        };
    }

    private parseCommunities(json: any): ICommunityData[] {
        return json.map((rawCommunity: any) => {
            return this.parseCommunity(rawCommunity);
        });
    }

    public async create(data: ICommunityCreateData) {
        const response = await ajax(config.api.communitiesCreate, JSON.stringify(data));
        await checkResponseStatus(response, config.api.communitiesCreate);
        const communityData = this.parseCommunity(response.parsedBody.body);
        return Promise.resolve(communityData);
    }

    public async delete(communityId: number | string) {
        let conf = config.api.communitiesDelete;
        conf.url = conf.url.replace('{:id}', communityId.toLocaleString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    public async edit(data: ICommunityEditData) {
        const response = await ajax(config.api.communitiesEdit, JSON.stringify(data));
        await checkResponseStatus(response, config.api.communitiesEdit);
        const communityData = this.parseCommunity(response.parsedBody.body);
        return Promise.resolve(communityData);
    }

    public async getAll() {
        const response = await ajax(config.api.communitiesAll);
        await checkResponseStatus(response, config.api.communitiesAll);
        const communitiesData = this.parseCommunities(response.parsedBody.body);
        return Promise.resolve(communitiesData);
    }

    public async get(communityId: number | string) {
        let conf = Object.assign({}, config.api.communitiesGet);
        conf.url = conf.url.replace('{:id}', communityId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const communityData = this.parseCommunity(response.parsedBody.body);
        return Promise.resolve(communityData);
    }

    public async findCommunities(searchQuery: string) {
        let conf = Object.assign({}, config.api.communitiesSearch);
        conf.url = conf.url.replace('{:name}', searchQuery);
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        const communitiesData = this.parseCommunities(response.parsedBody.body);
        return Promise.resolve(communitiesData);
    }

    public async joinCommutity(commId: number | string) {
        let conf = Object.assign({}, config.api.communitiesJoin);
        conf.url = conf.url.replace('{:id}', commId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }

    public async leaveCommutity(commId: number | string) {
        let conf = Object.assign({}, config.api.communitiesLeave);
        conf.url = conf.url.replace('{:id}', commId.toString());
        const response = await ajax(conf);
        await checkResponseStatus(response, conf);
        return Promise.resolve();
    }
};

export default CommunityModel;