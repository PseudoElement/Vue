import { AbstractOnChainTrade } from '../../dexes/abstract/abstract-on-chain-trade';
import { ResolvedTrade } from '../../dexes/services/models/calculation-service-types';
import { TradeState } from './trade-model';

export const TradeMutations = {
    selectTrade(state: TradeState, trade: AbstractOnChainTrade) {
        state.selectedTrade = trade;
    },
    clearSelectedTrade(state: TradeState) {
        state.selectedTrade = null;
    },
    setTrades(state: TradeState, trades: ResolvedTrade[]) {
        console.log('STORE', trades);
        state.trades = trades;
    }
};

export type TradeMutationsType = keyof typeof TradeMutations;
