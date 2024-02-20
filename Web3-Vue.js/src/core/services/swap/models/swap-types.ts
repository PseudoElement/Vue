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
    methodName: string;
    methodArgs: (string | number | string[])[];
    value: string;
    contractAddress: string;
    data: string;
    // gas?: string;
    // gasPrice?: string;
}
