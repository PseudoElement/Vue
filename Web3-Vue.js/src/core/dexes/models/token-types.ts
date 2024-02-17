import { BlockchainName } from '../../constants/blockchain-names';
import { AssetType } from '@/src/features/swap/components/swap-form/models/swap-form-types';
import { NonNullableObject } from '../../utils/types';

export type TokenInfo = NonNullableObject<AssetType> & { blockchain: BlockchainName };
export type TokenInfoWithoutAmount = Omit<TokenInfo, 'amount'>;
