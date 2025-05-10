interface ApiRequestProps {
    record: Record<string, unknown> | Record<string, unknown>[];
    object: string;
    requestParams?: ApiRequestParams;
}

interface ApiRequestParams {
    headers?: Record<string, string>;
}

type ApiResponseProps = [unknown, { type: string; message: string } | null];

interface submitRequestProps {
    data: Record<string, unknown> | Record<string, unknown>[];
    url: string;
    method: string;
    requestHeaders?: Record<string, string>;
}

interface submitRequestResponse {
    data: unknown | null;
    error: { type: string; message: string } | null;
    response: Response | null;
}

async function submitRequest({ data, url, method, requestHeaders }: submitRequestProps): Promise<submitRequestResponse> {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(requestHeaders),
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const { type, message } = await response.json();
            const error = { type: type || 'Request Error', message: message || 'Failed to submit request' };
            return { data: null, error, response};
        }

        return {data: await response.json(), error: null, response};
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit request';
        const errorResponse = { type: 'Network Error', message: errorMessage };
        return { data: null, error: errorResponse, response: null};
    }
}


const updateRecord = async ({ record, object, requestParams }: ApiRequestProps): Promise<ApiResponseProps> => {
    const { data, error } = await submitRequest({ data: record, url: `/api/services/rest?object=${object}`, method: 'PATCH', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data, null];
};

const deleteRecord = async ({ record, object, requestParams }: ApiRequestProps): Promise<ApiResponseProps> => {
    const { data, error } = await submitRequest({ data: record, url:   `/api/services/rest?object=${object}`, method: 'DELETE', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data, null];
};

const createRecord = async ({ record, object, requestParams }: ApiRequestProps): Promise<ApiResponseProps> => {
    const { data, error } = await submitRequest({ data: record, url: `/api/services/rest?object=${object}`, method: 'POST', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data, null];
}

export {
    updateRecord,
    deleteRecord,
    createRecord
}
