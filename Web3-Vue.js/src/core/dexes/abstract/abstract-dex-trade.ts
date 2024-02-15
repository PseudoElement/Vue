import { DexType } from '../models/dexes-list';

export abstract class AbstractDexTrade {
    public abstract readonly type: DexType;

    protected getTxDeadline(maxTimeSecs: number = 300): number {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const deadline = currentTimestamp + maxTimeSecs;
        return deadline;
    }
}
