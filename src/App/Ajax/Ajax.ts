import config from "../Configs/Config";

interface IParamsProps {
    url: string;
    method: string;
    headers: {};
};

/**
 * Функция асинхронного запроса на сервер
 * @param  {IParamsProps} params - параметры подключения
 * @param  {string} body - тело запроса
 * @return {Promise} - промис запроса 
 */
export async function ajax(params: IParamsProps, body?: string) {
    const response = await fetch(`${config.host}${params.url}`,
        {
            method: params.method,
            headers: params.headers,
            body: body,
            credentials: 'include',
        }
    );

    let parsedBody;
    try {
        parsedBody = await response.json();
    } catch (error) {
        // console.log('Ajax: parsing json error: ', error);
        parsedBody = {};
    }

    return {
        status: response.status,
        parsedBody
    };
}

export default ajax;