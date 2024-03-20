import { Injector } from '../../../../../core/services/injector/injector';
import {
    OneInchAllowanceReqParams,
    OneInchAllowanceResponse,
    OneInchApproveReqParams,
    OneInchApproveResponse,
    OneInchQuoteReqParams,
    OneInchQuoteResponse,
    OneInchSwapReqParams,
    OneInchSwapResponse
} from '../models/1inch-api-types';

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

    public async makeSwapReq(params: OneInchSwapReqParams): Promise<OneInchSwapResponse> {
        try {
            const res = await Injector.http.get<OneInchSwapResponse>(`${API_URL}/oneinch/swap`, params);

            return res;
        } catch (err) {
            throw new Error(`[1inch] SWAP ERROR - ${err}`);
        }
    }

    public async getAllowance(params: OneInchAllowanceReqParams): Promise<string> {
        try {
            const res = await Injector.http.get<OneInchAllowanceResponse>(`${API_URL}/oneinch/allowance`, params);

            return res.allowance;
        } catch (err) {
            throw new Error(`[1inch] ALLOWANCE ERROR - ${err}`);
        }
    }

    public async getApproveConfig(params: OneInchApproveReqParams): Promise<OneInchApproveResponse> {
        try {
            const res = await Injector.http.get<OneInchApproveResponse>(`${API_URL}/oneinch/approve`, params);

            return res;
        } catch (err) {
            throw new Error(`[1inch] ALLOWANCE ERROR - ${err}`);
        }
    }
}
