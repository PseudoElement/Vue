import { AbstractOnChainTrade } from '../abstract/abstract-dex-trade';
import { ON_CHAIN_PROVIDERS } from '../models/on-chain-providers-list';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';

export class CalculationService {
    public async getAvailableOnChainTrades(from: TokenInfo, to: TokenInfoWithoutAmount): Promise<AbstractOnChainTrade[]> {
        const promises = ON_CHAIN_PROVIDERS.map((ProviderClass) => new ProviderClass(from, to)).map((provider) => provider.calculate());
        const trades = await Promise.allSettled(promises);
        const availableTrades = trades
            .filter((trade) => trade.status === 'fulfilled')
            .map((filtered) => (filtered as PromiseFulfilledResult<AbstractOnChainTrade>).value);

        return availableTrades;
    }
}
