import BigNumber from 'bignumber.js';
import { Bytes, Log, Numbers, TransactionReceiptBase } from 'web3';

export interface TxParams {
    /* contract address */
    to: string;
    /* encoded contract call returned value */
    data: string;
    /* vlaue in wei */
    value?: string;
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

export type AppTxReceipt = TransactionReceiptBase<Numbers, string, Bytes, Log>;
