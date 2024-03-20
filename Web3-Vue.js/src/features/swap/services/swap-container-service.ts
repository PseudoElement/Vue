import { Injector } from '../../../core/services/injector/injector';
import { TxHash } from '../../../core/dexes/models/trade-common-types';
import { AssetType, AssetTypeWithoutAmount } from '../components/swap-form/models/swap-form-types';
import { AbstractOnChainTrade } from '../../../core/dexes/abstract/abstract-on-chain-trade';
import { Web3Service } from '../../../core/services/web3-service/web3-service';
import BigNumber from 'bignumber.js';
import { Utils } from '../../../../src/core/utils/utils';

export class SwapContainerService {
    public needCalculateTrades(from: AssetType, to: AssetTypeWithoutAmount): boolean {
        const isFromFullfilled = Object.values(from).every(Boolean);
        const isToFullfilled = Object.values(to).every(Boolean);
        return isFromFullfilled && isToFullfilled;
    }

    public async swap(): Promise<TxHash | void> {
        try {
            const trade = Injector.storeState.trade.selectedTrade as AbstractOnChainTrade;
            const isEnoughBalance = await this.isEnoughBalance(trade.from.amount, trade.from.address);

            if (!isEnoughBalance) {
                throw new Error('Insufficient balance');
            }

            const hash = await trade.swap();

            return hash;
        } catch (err: unknown) {
            Utils.parseError(err as Error);
        } finally {
            Injector.storeCommit('clearSelectedTrade');
        }
    }

    public async isEnoughBalance(amount: BigNumber, tokenAddress: string): Promise<boolean> {
        const balance = await Web3Service.getBalance(Injector.walletAddress, tokenAddress);
        return balance.isGreaterThanOrEqualTo(amount);
    }
}
