import BigNumber from 'bignumber.js';

export interface TokenInfo {
    address: string;
    decimals: number;
    symbol: string;
    amount: BigNumber;
}

export type TokenInfoWithoutAmount = Omit<TokenInfo, 'amount'>;
