import { BlockchainName } from '@/src/core/constants/blockchain-names';
import { TokenName } from '@/src/core/constants/token-names';
import { SelectOption } from '@/src/shared/inputs/input-select/model';

export interface AssetType {
    token: TokenName | null;
    blockchain: BlockchainName;
    amount: string;
}

export interface ChainOption extends SelectOption {
    value: BlockchainName;
}

export interface TokenOption extends SelectOption {
    value: TokenName;
}
