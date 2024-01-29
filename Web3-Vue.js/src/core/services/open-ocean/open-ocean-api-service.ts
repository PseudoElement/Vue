import { OPEN_OCEAN_ENDPOINT } from './constants/open-ocean-api';
import { OpenOceanGetTokenListResponse, OpenOceanToken } from './models/open-ocean-api-types';

export class OpenOceanApiService {
    public static async getTokenList(chainId: number): Promise<OpenOceanToken[]> {
        const res = await fetch(`${OPEN_OCEAN_ENDPOINT}/v3/${chainId}/tokenList`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-cache'
        });

        const obj = (await res.json()) as OpenOceanGetTokenListResponse;

        return obj.data;
    }
}
