interface ApiRequestProps {
    record: Record<string, unknown> | Record<string, unknown>[];
    object: string;
    requestParams?: ApiRequestParams;
}

interface FileUploadProps {
    files: File[]; // Optional property for file uploads
    requestParams?: ApiRequestParams;
}

interface FileDeleteProps {
    fileIds: string[]; // Optional property for file uploads
    requestParams?: ApiRequestParams;
}

interface ApiRequestParams {
    headers?: Record<string, string>;
}

type ApiResponseProps = [unknown, { type: string; message: string, record?: Record<string, unknown> } | null];
type FileUploadResponse = [Record<string, string> | null, { type: string; message: string } | null];

interface submitRequestProps {
    data: Record<string, unknown> | Record<string, unknown>[] | FormData;
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
        // Set up request options
        const options: RequestInit = {
            method,
            headers: requestHeaders
        };

        // Handle different types of data
        if (data instanceof FormData) {
            // For FormData, don't set Content-Type as the browser will set it with boundary
            options.body = data;
        } else if (data && !(data instanceof FormData)) {
            options.headers = {
                'Content-Type': 'application/json',
                ...requestHeaders
            };
            options.body = JSON.stringify(data);
        }

        // Make the request
        const response = await fetch(url, options);

        if (!response.ok) {
            const { type, message } = await response.json();
            const error = { type: type || 'Request Error', message: message || 'Failed to submit request' };
            return { data: null, error, response };
        }

        return { data: await response.json(), error: null, response };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit request';
        const errorResponse = { type: 'Network Error', message: errorMessage };
        return { data: null, error: errorResponse, response: null };
    }
}


const updateRecord = async ({ record, object, requestParams }: ApiRequestProps): Promise<ApiResponseProps> => {
    const { data, error } = await submitRequest({ data: record, url: `/api/services/rest?object=${object}`, method: 'PATCH', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data, null];
};

const deleteRecord = async ({ record, object, requestParams }: ApiRequestProps): Promise<ApiResponseProps> => {
    const { data, error } = await submitRequest({ data: record, url: `/api/services/rest?object=${object}`, method: 'DELETE', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data, null];
};

const createRecord = async ({ record, object, requestParams }: ApiRequestProps): Promise<ApiResponseProps> => {
    const { data, error } = await submitRequest({ data: record, url: `/api/services/rest?object=${object}`, method: 'POST', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data, null];
}

/**
 * Uploads one or more files to the server using the standard submitRequest format
 * @param {ApiRequestProps} props - The request properties
 * @returns {Promise<ApiResponseProps>} A tuple with [response, error]
 */
const uploadFiles = async ({ files, requestParams }: FileUploadProps): Promise<FileUploadResponse> => {
    try {
        // Create FormData object for file uploads
        const formData = new FormData();

        // Append each file to the FormData
        files?.forEach(file => {
            formData.append('files', file);
        });

        // Make the API request using submitRequest pattern
        const { data, error } = await submitRequest({
            data: formData,
            url: `/api/services/file`,
            method: 'POST',
            requestHeaders: requestParams?.headers
        });

        return (error) ? [null, error] : [data as Record<string, string>, null];
    } catch (error) {
        console.error('File upload failed:', error);
        return [null, {
            type: 'File Upload Error', message: 'Failed to upload files',
        }];
    }
};

/**
 * Uploads one or more files to the server using the standard submitRequest format
 * @param {ApiRequestProps} props - The request properties
 * @returns {Promise<ApiResponseProps>} A tuple with [response, error]
 */
const deleteFiles = async ({ fileIds, requestParams }: FileDeleteProps): Promise<FileUploadResponse> => {
    const formData = new FormData();

    fileIds.forEach((fileId) => {
        formData.set('id', fileId);
    });

    const { data, error } = await submitRequest({ data: formData, url: `/api/services/file`, method: 'DELETE', requestHeaders: requestParams?.headers });
    return (error) ? [null, error] : [data as Record<string, string>, null];
}

export {
    updateRecord,
    deleteRecord,
    createRecord,
    uploadFiles,
    deleteFiles
}
