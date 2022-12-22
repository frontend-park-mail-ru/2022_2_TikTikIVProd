import ajax, { checkResponseStatus } from "../../Ajax/Ajax";
import config from "../../Configs/Config";
import IModel from "../IModel/IModel";

export interface IImage {
    id: string | number;
    type: 'image';
    src: string;
}

class ImageUploadModel extends IModel {
    constructor() {
        super();
    }

    static parseStickers(json: any) : IImage[] {
        if(!json) return [];
        
        const stickers: IImage[] = [];
        json.forEach((element: any) => {
            stickers.push({
                id: element.id,
                src: config.host+`${config.api.stickerById.url.replace('{:id}', element.id)}`,
                type: 'image',
            });
        });
        return stickers;
    }

    static parseImages(json: any): IImage[] {
        if(!json) return [];
        
        const attachments: IImage[] = [];
        json.forEach((element: any) => {
            attachments.push({
                id: element.id,
                src: config.host+`${config.api.image.url.replace('{:id}', element.id)}`,
                type: 'image',
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
            type: 'image',
        };
        return Promise.resolve(img);
    }

    static async stickerById(id: number | string) {
        const conf = Object.assign(config.api.stickerById);
        conf.url = conf.url.replace('{:id}', Number(id));

        const response = await ajax(config.api.stickerById);
        await checkResponseStatus(response, config.api.stickerById);
        const sticker = ImageUploadModel.parseStickers(response.parsedBody.body)[0];
        return Promise.resolve(sticker);
    }

    static async getStickers() {
        const response = await ajax(config.api.stickers);
        await checkResponseStatus(response, config.api.stickers);
        const stickers = ImageUploadModel.parseStickers(response.parsedBody.body);
        return Promise.resolve(stickers);
    }
};

export default ImageUploadModel;