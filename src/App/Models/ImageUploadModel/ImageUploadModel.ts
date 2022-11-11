import ajax from "../../Ajax/Ajax";
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

    // public async getImage(id: string | number) {

    //     let conf = Object.assign({}, config.api.image);
    //     conf.url = conf.url.replace('{:id}', id.toString());

    //     const response = await ajax(conf);

    //     if (response.status.toString() in config.api.imageUpload.statuses.success) {
    //         const img: IImage = {
    //             id: response.parsedBody.body.id,
    //             src: 
    //         }

    //         return Promise.resolve();
    //     }

    //     if (response.status.toString() in config.api.imageUpload.statuses.failure) {
    //         const keyStatus = response.status.toString() as keyof typeof config.api.imageUpload.statuses.failure;
    //         return Promise.reject({
    //             status: response.status,
    //             msg: config.api.imageUpload.statuses.failure[keyStatus],
    //             body: response.parsedBody
    //         });
    //     }

    //     return Promise.reject({
    //         status: response.status,
    //         msg: 'Неожиданная ошибка',
    //     });
    // }

    public async uploadImage(data: FormData) {
        const response = await ajax(config.api.imageUpload, data);

        if (response.status.toString() in config.api.imageUpload.statuses.success) {

            const img: IImage = {
                id: response.parsedBody.body.id,
                src: config.host + config.api.image.url + '/' + response.parsedBody.body.id,
            };

            return Promise.resolve(img);
        }

        if (response.status.toString() in config.api.imageUpload.statuses.failure) {
            const keyStatus = response.status.toString() as keyof typeof config.api.imageUpload.statuses.failure;
            return Promise.reject({
                status: response.status,
                msg: config.api.imageUpload.statuses.failure[keyStatus],
                body: response.parsedBody
            });
        }

        return Promise.reject({
            status: response.status,
            msg: 'Неожиданная ошибка',
        });
    }
};

export default ImageUploadModel;