import { AbstractOnChainTrade } from '../../dexes/abstract/abstract-on-chain-trade';
import { ResolvedTrade } from '../../dexes/services/models/calculation-service-types';

export interface TradeState {
    selectedTrade: AbstractOnChainTrade | null;
    trades: ResolvedTrade[];
}
