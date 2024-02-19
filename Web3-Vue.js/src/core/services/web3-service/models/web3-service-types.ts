import BigNumber from 'bignumber.js';

export interface TxParams {
    /* wallet address */
    fromAddress: string;
    /* contract address */
    toAddress: string;
    /* encoded contract call returned value */
    data: string;
    /* vlaue in wei */
    value?: string;
    gas: string;
    /* wei amount */
    gasPrice: string;
}

export interface GetTxObjectParams {
    contractAddress: string;
    data: string;
    value: string;
}

export interface EstimateGasParams {
    from: string;
    to: string;
    value?: string | BigNumber;
    data?: string;
}
