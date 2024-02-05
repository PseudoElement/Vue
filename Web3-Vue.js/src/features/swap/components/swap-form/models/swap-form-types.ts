import { BlockchainName } from '@/src/core/constants/blockchain-names';
import { SelectOption } from '@/src/shared/inputs/input-select/model';

export interface AssetType {
    token: string | null;
    blockchain: BlockchainName;
    address: string | null;
}

export interface ChainOption extends SelectOption {
    value: BlockchainName;
}

export interface TokenOption extends SelectOption {
    address: string;
}
