interface IParamsProps {
    url: string;
    method: string;
    body?: string;
};


(function () {
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

    }



    (window as any).ajax = new Ajax();
})();
