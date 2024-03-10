import { AbstractOnChainTrade } from '../abstract/abstract-dex-trade';
import { ON_CHAIN_PROVIDERS } from '../models/on-chain-providers-list';
import { TokenInfo, TokenInfoWithoutAmount } from '../models/token-types';
import { ResolvedTrade } from './models/calculation-service-types';

export class CalculationService {
    public async getCalculatedTrades(from: TokenInfo, to: TokenInfoWithoutAmount): Promise<ResolvedTrade[]> {
        const trades = ON_CHAIN_PROVIDERS.map((ProviderClass) => new ProviderClass(from, to))
        const promises = trades.map((provider) => provider.calculate());
        const resolvedPromises = await Promise.allSettled(promises);

        const activeTrades = resolvedPromises
            .filter((trade) => trade.status === 'fulfilled')
            .map((filtered) => (filtered as PromiseFulfilledResult<AbstractOnChainTrade>).value)
            .map(trade => ({ trade, isActive: true}))
        const isActive = (trade: AbstractOnChainTrade) => !!activeTrades.find(wrapped=> wrapped.trade.type === trade.type);
        const inactiveTrades = trades.filter(t => !isActive(t)).map(trade => ({trade, isActive: false}))


        return [...activeTrades, ...inactiveTrades]
    }
}
