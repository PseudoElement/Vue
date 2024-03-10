import { Injector } from '../../../core/services/injector/injector';
import { TxHash } from '../../../core/dexes/models/trade-common-types';
import { AssetType, AssetTypeWithoutAmount } from '../components/swap-form/models/swap-form-types';
import { AbstractOnChainTrade } from '../../../core/dexes/abstract/abstract-on-chain-trade';

export class SwapContainerService {
    public needCalculateTrades(from: AssetType, to: AssetTypeWithoutAmount): boolean {
        const isFromFullfilled = Object.values(from).every(Boolean);
        const isToFullfilled = Object.values(to).every(Boolean);
        return isFromFullfilled && isToFullfilled;
    }

    public async swap(): Promise<TxHash> {
        try {
            const trade = Injector.storeState.trade.selectedTrade as AbstractOnChainTrade;
            const hash = await trade.swap();

            return hash;
        } catch (err) {
            throw new Error(`[SwapContainerService] Swap error - ${err}`);
        } finally {
            Injector.storeCommit('clearSelectedTrade');
        }
    }
}
