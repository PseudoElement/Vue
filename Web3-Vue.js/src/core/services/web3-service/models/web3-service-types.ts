import BigNumber from 'bignumber.js';

export interface TxObject {
    /* contract address */
    to: string;
    /* encoded contract call returned value */
    data: string;
    /* vlaue in wei */
    value?: string;
    gas?: number;
    /* wei amount */
    gasPrice?: string;
}

export interface GetTxObjectParams {
    contractAddress: string;
    data: string;
    value?: string | BigNumber;
    decimals?: number;
}

export interface EstimateGasParams {
    from: string;
    to: string;
    value?: string | BigNumber;
    data?: string;
}
