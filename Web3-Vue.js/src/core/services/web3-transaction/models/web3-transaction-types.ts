import { AbiFunctionFragment } from 'web3';

export type AppContractAbi = ReadonlyArray<AbiFunctionFragment>;

export interface SendTxParams {
    fromAddress: string;
    /* contract address */
    to: string;
    value: string;
    data: string;
}

export interface ContractParams {
    abi: AppContractAbi;
    contractAddress: string;
    methodName: string;
    methodArgs: (string | number | string[])[];
    value: string;
    data: string;
    // gas?: string;
    // gasPrice?: string;
}

export type CallContractParams = Omit<ContractParams, 'value' | 'data'>;
