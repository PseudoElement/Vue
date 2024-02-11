import { BlockchainName } from '@/src/core/constants/blockchain-names';
import { SelectOption } from '@/src/shared/inputs/input-select/model';
import BigNumber from 'bignumber.js';

export interface AssetType {
    token: string | null;
    blockchain: BlockchainName | null;
    address: string | null;
    decimals: number | null;
    amount: BigNumber | null;
}

export interface ChainOption extends SelectOption {
    value: BlockchainName;
}

export interface TokenOption extends SelectOption {
    address: string | null;
}
