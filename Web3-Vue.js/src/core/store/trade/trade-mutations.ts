import { AbstractOnChainTrade } from '../../dexes/abstract/abstract-dex-trade';
import { TradeState } from './trade-model';

export const TradeMutations = {
    selectTrade(state: TradeState, trade: AbstractOnChainTrade) {
        state.selectedTrade = trade;
    },
    setTrades(state: TradeState, trades: AbstractOnChainTrade[]) {
        state.trades = trades;
    }
};

export type TradeMutationsType = keyof typeof TradeMutations;
