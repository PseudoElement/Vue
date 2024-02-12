import { AbiFunctionFragment } from 'web3';

export type AppContractAbi = ReadonlyArray<AbiFunctionFragment>;

export interface SendTxParams {
    fromAddress: string;
    toAddress: string;
    value: string;
    data: string;
}

export interface SendContractParams {
    abi: AppContractAbi;
    methodName: string;
    methodArgs: string[];
    fromAddress: string;
    toAddress: string;
    value: string;
    contractAddress: string;
    data?: string;
    gas?: string;
    gasPrice?: string;
}

export type CallContractParams = SendContractParams;
