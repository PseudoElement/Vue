import { AssetType, AssetTypeWithoutAmount } from '../components/swap-form/models/swap-form-types';

export class SwapContainerService {
    public needCalculateTrades(from: AssetType, to: AssetTypeWithoutAmount): boolean {
        const isFromFullfilled = Object.values(from).every(Boolean);
        const isToFullfilled = Object.values(to).every(Boolean);
        return isFromFullfilled && isToFullfilled;
    }
}
