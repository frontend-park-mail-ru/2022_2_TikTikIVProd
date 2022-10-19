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
        // let headers = new Headers();
        // headers.append('Content-Type', 'text/plain');
        // headers.append('Accept', 'application/json');

        // headers.append('Access-Control-Allow-Origin', '*');
        // headers.append('Access-Control-Allow-Credentials', 'true');


        const response = await fetch(params.url,
            {
                method: params.method,
                // headers: headers,
                body: params.body,
                credentials: 'include',
            }
        );

        const parsedBody = await response.json();

        return {
            status: response.status,
            parsedBody
        };
    }

    async get(url: string) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.GET });
    };

    async post(url: string, body: string) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.POST, body: body });
    };

    async put(url: string, body: string) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.PUT, body: body });
    };

    async getTest(url: string) {
        return Promise.reject({ status: 400, parsedBody: 'none' });
    };

}

export default new Ajax();

