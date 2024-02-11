import { ContractAbi } from 'web3';

export interface SendTxParams {
    fromAddress: string;
    toAddress: string;
    value: string;
    data: string;
}

export interface SendContractParams {
    abi: ContractAbi;
    methodName: string;
    methodArgs: string[];
    fromAddress: string;
    toAddress: string;
    value: string;
    contractAddress?: string;
    data?: string;
    gas?: string;
    gasPrice?: string;
}

export type CallContractParams = SendContractParams;
