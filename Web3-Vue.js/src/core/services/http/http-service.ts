import axios from 'axios';

export class HttpService {
    public async get<T>(path: string, params: any, headers?: Record<string, string>): Promise<T> {
        const queryParams = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const url = `${path}?${queryParams}`;
        const res = await axios.get<T>(url, { ...(headers && { headers }) });

        return res.data;
    }
}
