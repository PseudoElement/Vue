import { AppContractAbi } from '../../services/swap/models/swap-types';
import { DexType } from '../models/dexes-list';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';

export abstract class AbstractDexTrade {
    public abstract readonly type: DexType;

    public abstract readonly from: TokenInfo;

    public abstract readonly to: TokenInfoWithoutAmount;

    protected abstract readonly contractAddress: string;

    protected abstract readonly contractAbi: AppContractAbi;

    protected getTxDeadline(maxTimeSecs: number = 300): number {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const deadline = currentTimestamp + maxTimeSecs;
        return deadline;
    }
}
