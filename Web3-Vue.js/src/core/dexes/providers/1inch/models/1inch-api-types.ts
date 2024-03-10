export interface OneInchQuoteReqParams {
    src: string;
    dst: string;
    amount: string;
}

export interface OneInchSwapReqParams extends OneInchQuoteReqParams {
    /* source wallet address */
    from: string;
    /* destination wallet address */
    receiver?: string;
}

export interface OneInchQuoteResponse {
    toAmount: string;
    gas: number;
    fromToken: any;
    toToken: any;
    protocols: any;
}

export interface OneInchSwapResponse {
    tx: OneInchTx;
    toAmount: string;
    fromToken: any;
    toToken: any;
    protocols: any;
}

interface OneInchTx {
    to: string;
    data: string;
    value: string;
    from: string;
    gasPrice: string;
    gas: number;
}
