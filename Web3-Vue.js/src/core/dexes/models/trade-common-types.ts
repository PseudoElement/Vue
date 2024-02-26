export type ContractMethodArguments = (string | number | string[])[];

export type TxHash = string;

export const SWAP_TX_TYPE = {
    SWAP_VIA_CONTRACT_SEND: 'swapViaContractSend',
    SWAP_VIA_SEND_TRANSACTION: 'swapViaSendTransaction'
} as const;

export type SwapTxType = (typeof SWAP_TX_TYPE)[keyof typeof SWAP_TX_TYPE];
