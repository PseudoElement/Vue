import { Injector } from '../../../../../core/services/injector/injector';
import { OneInchQuoteReqParams, OneInchQuoteResponse, OneInchSwapReqParams, OneInchSwapResponse } from '../models/1inch-api-types';
import { ONE_INCH_API_URL } from '../constants/1inch-api';

const API_URL = 'http://localhost:8080/api/v1';

export class OneInchApiService {
    public async makeQuoteReq(params: OneInchQuoteReqParams): Promise<OneInchQuoteResponse> {
        try {
            const res = await Injector.http.get<OneInchQuoteResponse>(`${API_URL}/oneinch/quote`, params);

            return res;
        } catch (err) {
            throw new Error(`[1inch] QUOTE ERROR - ${err}`);
        }
    }

    public async makeSwapReq(chainId: number, params: OneInchSwapReqParams): Promise<OneInchSwapResponse> {
        try {
            const res = await Injector.http.get<OneInchSwapResponse>(`${ONE_INCH_API_URL}/${chainId}/swap`, params);

            return res;
        } catch (err) {
            throw new Error(`[1inch] SWAP ERROR - ${err}`);
        }
    }
}
