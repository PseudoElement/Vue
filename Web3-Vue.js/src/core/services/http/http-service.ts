export class HttpService {
    public async get<T>(path: string, params: any, headers?: Record<string, string>): Promise<T> {
        const queryParams = Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const url = `${path}?${queryParams}`;

        const rawRes = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...(headers && { ...headers })
            }
        });
        const res = await rawRes.json();

        return res;
    }
}
