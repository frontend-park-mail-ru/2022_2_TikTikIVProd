interface IParamsProps {
    url: string;
    method: string;
    body?: string;
};



const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
};


class Ajax {
    private async asyncFetch(params: IParamsProps) {
        const response = await fetch(params.url, {
            method: params.method,
            body: params.body,
        });

        const parsedBody = await response.json();

        return {
            status: response.status,
            parsedBody
        };
    }

    async get(url: string) {
        return this.asyncFetch({ url: url, method: REQUEST_TYPE.GET });
    };

    async post(url: string, body: string) {
        return this.asyncFetch({ url: url, method: REQUEST_TYPE.POST, body: body });
    };

    async put(url: string, body: string) {
        return this.asyncFetch({ url: url, method: REQUEST_TYPE.PUT, body: body });
    };

    async getTest(url: string) {
        return Promise.reject({ status: 400, parsedBody: 'none' });
    };

}



const ajax = new Ajax();
export default ajax;

