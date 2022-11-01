interface IParamsProps {
    url: string;
    method: string;
    body?: string;
};

const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

class Ajax {
    private async asyncFetch(params: IParamsProps) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        const response = await fetch(params.url,
            {
                method: params.method,
                headers: headers,
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

    async delete(url: string) {
        return await this.asyncFetch({ url: url, method: REQUEST_TYPE.DELETE });
    };
}

export default new Ajax();

