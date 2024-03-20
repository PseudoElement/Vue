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

export interface OneInchAllowanceReqParams {
    src: string;
    walletAddress: string;
    chainId: number;
}

export interface OneInchApproveReqParams {
    src: string;
    amount: string;
    chainId: number;
}

export interface OneInchQuoteResponse {
    dstAmount: string;
    gas: number;
    fromToken: any;
    toToken: any;
    protocols: any;
}

export interface OneInchSwapResponse {
    tx: OneInchTx;
    toAmount: string;
}

export interface OneInchAllowanceResponse {
    allowance: string;
}

export interface OneInchApproveResponse {
    data: string;
    to: string;
    value: string;
    gasPrice: string;
}

interface OneInchTx {
    to: string;
    data: string;
    value: string;
    from: string;
    gas: number;
}
