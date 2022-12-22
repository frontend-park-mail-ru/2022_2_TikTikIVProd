import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
import config from "../../Configs/Config";
import IModel from "../IModel/IModel";

export interface IImage {
    id: string | number;
    src: string;
}

class ImageUploadModel extends IModel {
    constructor() {
        super();
    }

    static parseImages(json: any): IImage[] {
        const attachments: IImage[] = [];
        json.forEach((element: any) => {
            attachments.push({
                id: element.id,
                src: config.host+`${config.api.image.url.replace('{:id}', element.id)}`
            });
        });
        return attachments;
    }

    // public async getImage(id: string | number) {

    //     let conf = Object.assign({}, config.api.image);
    //     conf.url = conf.url.replace('{:id}', id.toString());

    //     const response = await ajax(conf);
    //     await checkResponseStatus(response, conf);

    //     const img: IImage = {
    //         id: response.parsedBody.body.id,
    //         src: '', // TODO
    //     }

    //     return Promise.resolve(img);
    // }

    public async uploadImage(data: FormData) {
        const response = await ajax(config.api.imageUpload, data);
        await checkResponseStatus(response, config.api.imageUpload);
        const img: IImage = {
            id: response.parsedBody.body.id,
            src: config.host + `${config.api.image.url.replace('{:id}', response.parsedBody.body.id)}`,
        };
        return Promise.resolve(img);
    }
};

export default ImageUploadModel;