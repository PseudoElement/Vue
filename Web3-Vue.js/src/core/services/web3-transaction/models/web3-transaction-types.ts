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
    /* optional cause you get data using encodeABI() or encodeFunctionCall().
       It's the same to contract.methods[methodName](...args)
    */
    data?: string;
    // gas?: string;
    // gasPrice?: string;
}

export type CallContractParams = Omit<ContractParams, 'value' | 'data'>;
