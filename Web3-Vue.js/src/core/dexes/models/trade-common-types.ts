import BigNumber from 'bignumber.js';
import { AppContractAbi } from '../../services/swap/models/swap-types';

export interface ContractParams {
    contractAddress: string;
    contractAbi: AppContractAbi;
    methodName: string;
    methodArgs: (string | boolean | BigNumber)[];
    /* wei amount */
    value: string;
}

export type TxHash = string;
