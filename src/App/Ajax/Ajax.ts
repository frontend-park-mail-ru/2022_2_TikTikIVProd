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
export async function ajax(params: IParamsProps, body?: string | FormData) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json;charset=utf-8');

    const headers = new Headers(params.headers);
    
    // const csrfResponse = await fetch(`${config.host}${config.api.csrf.url}`, {
    //     method: config.api.csrf.method,
    //     headers: headers,
    //     credentials: 'include',
    // });

    // const csrfToken = csrfResponse.headers.get('X-CSRF-Token');
    // if (csrfToken !== null) {
    //     headers.append('X-CSRF-Token', csrfToken);
    // }


    let response = await fetch(`${config.host}${params.url}`,
        {
            method: params.method,
            headers: headers,
            body: body,
            credentials: 'include',
            
        }
    );

    let parsedBody;
    try {
        parsedBody = await response.json();
    } catch (error) {
        parsedBody = {};
    }

    return {
        status: response.status,
        parsedBody
    };
}

export default ajax;