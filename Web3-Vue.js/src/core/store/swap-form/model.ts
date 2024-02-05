import { AssetType } from '../../../features/swap/components/swap-form/models/swap-form-types';

export interface SwapFormState {
    from: AssetType;
    to: AssetType;
}
