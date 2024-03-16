export interface OneInchQuoteReqParams {
    src: string;
    dst: string;
    amount: string;
    chainId: number;
}

export interface OneInchSwapReqParams extends OneInchQuoteReqParams {
    /* source wallet address */
    from: string;
    slippage: number;
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
